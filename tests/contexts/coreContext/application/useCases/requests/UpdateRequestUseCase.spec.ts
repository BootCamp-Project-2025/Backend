import "reflect-metadata";
import UpdateRequestUseCase from "@/contexts/CoreContext/application/useCases/requests/UpdateRequestUseCase";
import IRequestRepository from "@/contexts/CoreContext/domain/interfaces/repositories/IRequestRepository";
import { Request } from "@/contexts/CoreContext/domain/aggregates/Request";

describe("UpdateRequestUseCase", () => {
  it("should call repository.update", async () => {
    const mockRequest = {} as unknown as Request;

    const mockRepository: jest.Mocked<IRequestRepository> = {
      update: jest.fn().mockResolvedValue("updated" as unknown as Request),
      create: jest.fn(),
      findById: jest.fn(),
      delete: jest.fn(),
      findAllActiveByUserId: jest.fn(),
    };

    const useCase = new UpdateRequestUseCase(mockRepository);
    const result = await useCase.execute({
      requestId: "1",
      request: mockRequest,
    });

    expect(result).toBe("updated");
    expect(mockRepository.update).toHaveBeenCalledWith("1", mockRequest);
  });
});
