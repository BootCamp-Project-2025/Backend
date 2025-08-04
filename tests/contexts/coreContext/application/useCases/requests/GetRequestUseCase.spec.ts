import "reflect-metadata";
import GetRequestUseCase from "@/contexts/CoreContext/application/useCases/requests/GetRequestUseCase";
import IRequestRepository from "@/contexts/CoreContext/domain/interfaces/repositories/IRequestRepository";
import { Request as RequestEntity } from "@/contexts/CoreContext/domain/aggregates/Request";

describe("GetRequestUseCase", () => {
  let mockRepository: jest.Mocked<IRequestRepository>;
  let useCase: GetRequestUseCase;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      create: jest.fn(),
      findAllActiveByUserId: jest.fn(),
    } as jest.Mocked<IRequestRepository>;

    useCase = new GetRequestUseCase(mockRepository);
  });

  it("should call repository.findById", async () => {
    const mockRequest = {} as RequestEntity;
    mockRepository.findById.mockResolvedValue(mockRequest);

    const result = await useCase.execute("req-1");

    expect(result).toBe(mockRequest);
    expect(mockRepository.findById).toHaveBeenCalledWith("req-1");
  });
});
