import "reflect-metadata";

import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import type { User } from "@/contexts/CoreContext/domain/aggregates/User";
import { SyncUserUseCase } from "@/contexts/CoreContext/application/useCases/auth/SyncUserUseCase";

describe("SyncUserUseCase", () => {
  let mockUserId: { toValue: jest.Mock<string, []> };
  let mockUser: User;
  let repository: {
    getById: jest.Mock<Promise<User | null>, [string]>;
    create: jest.Mock<Promise<User>, [User]>;
    addFreelancerProfile: jest.Mock;
    getUserProfileById: jest.Mock;
    updateUserProfile: jest.Mock;
    getAll: jest.Mock;
    delete: jest.Mock;
    update: jest.Mock;
  };
  let useCase: SyncUserUseCase;

  beforeEach(() => {
    mockUserId = {
      toValue: jest.fn(),
    };

    mockUser = {
      id: mockUserId,
      name: "Test User",
    } as unknown as User;

    repository = {
      getById: jest.fn(),
      updateUserProfile: jest.fn(),
      create: jest.fn(),
      addFreelancerProfile: jest.fn(),
      getUserProfileById: jest.fn(),
      getAll: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    };

    useCase = new SyncUserUseCase(repository);
  });

  it("should return existing user if found", async () => {
    repository.getById.mockResolvedValue(mockUser);
    mockUserId.toValue.mockReturnValue("user-id");

    const result = await useCase.execute(mockUser);

    expect(repository.getById).toHaveBeenCalledWith("user-id");
    expect(result).toBe(mockUser);
    expect(repository.create).not.toHaveBeenCalled();
  });

  it("should create and return new user if not found", async () => {
    repository.getById.mockResolvedValue(null);
    repository.create.mockResolvedValue(mockUser);
    mockUserId.toValue.mockReturnValue("user-id");

    const result = await useCase.execute(mockUser);

    expect(repository.getById).toHaveBeenCalledWith("user-id");
    expect(repository.create).toHaveBeenCalledWith(mockUser);
    expect(result).toBe(mockUser);
  });

  it("should throw ApiError on repository error", async () => {
    repository.getById.mockRejectedValue(new Error("DB error"));
    mockUserId.toValue.mockReturnValue("user-id");

    await expect(useCase.execute(mockUser)).rejects.toBeInstanceOf(ApiError);
  });
});
