import "reflect-metadata"
import { ApiError } from '@/contexts/Shared/infrastructure/errors/ApiError';

describe('SyncUserUseCase', () => {
  const mockUser = { id: { toValue: jest.fn() }, name: 'Test User' } as any;
  let repository: any;
  let useCase: any;

  beforeEach(() => {
    repository = {
      getById: jest.fn(),
      create: jest.fn(),
    };
    useCase = new (require('@/contexts/CoreContext/application/useCases/SyncUserUseCase').SyncUserUseCase)(repository);
  });

  it('should return existing user if found', async () => {
    repository.getById.mockResolvedValue(mockUser);
    mockUser.id.toValue.mockReturnValue('user-id');
    const result = await useCase.execute(mockUser);
    expect(repository.getById).toHaveBeenCalledWith('user-id');
    expect(result).toBe(mockUser);
    expect(repository.create).not.toHaveBeenCalled();
  });

  it('should create and return new user if not found', async () => {
    repository.getById.mockResolvedValue(null);
    repository.create.mockResolvedValue(mockUser);
    mockUser.id.toValue.mockReturnValue('user-id');
    const result = await useCase.execute(mockUser);
    expect(repository.getById).toHaveBeenCalledWith('user-id');
    expect(repository.create).toHaveBeenCalledWith(mockUser);
    expect(result).toBe(mockUser);
  });

  it('should throw ApiError on repository error', async () => {
    repository.getById.mockRejectedValue(new Error('DB error'));
    mockUser.id.toValue.mockReturnValue('user-id');
    await expect(useCase.execute(mockUser)).rejects.toBeInstanceOf(ApiError);
  });
});