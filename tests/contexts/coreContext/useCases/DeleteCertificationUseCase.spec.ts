import "reflect-metadata";
import { DeleteCertificationUseCase } from "@/contexts/CoreContext/application/useCases/certifications/DeleteCertificationUseCase";
import { ICertificationRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/ICertificationRepository";

describe("DeleteCertificationUseCase", () => {
  const mockRepo: jest.Mocked<ICertificationRepository> = {
    delete: jest.fn(),
  } as unknown as jest.Mocked<ICertificationRepository>;

  const useCase = new DeleteCertificationUseCase(mockRepo);

  it("should call repository.delete with the correct id", async () => {
    await useCase.execute("cert-1");
    expect(mockRepo.delete).toHaveBeenCalledWith("cert-1");
  });

  it("should propagate repository errors", async () => {
    mockRepo.delete.mockRejectedValueOnce(new Error("fail"));
    await expect(useCase.execute("fail-id")).rejects.toThrow("fail");
  });
});
