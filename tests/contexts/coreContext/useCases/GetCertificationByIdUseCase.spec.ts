import "reflect-metadata";
import { GetCertificationByIdUseCase } from "@/contexts/CoreContext/application/useCases/certifications/GetCertificationByIdUseCase";
import { ICertificationRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/ICertificationRepository";
import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";

describe("GetCertificationByIdUseCase", () => {
  const mockRepo: jest.Mocked<ICertificationRepository> = {
    findById: jest.fn(),
  } as unknown as jest.Mocked<ICertificationRepository>;

  const useCase = new GetCertificationByIdUseCase(mockRepo);

  it("should call getById with correct id", async () => {
    await useCase.execute("cert-id");
    expect(mockRepo.findById).toHaveBeenCalledWith("cert-id");
  });

  it("should return certification from repo", async () => {
    const cert = { id: "cert-id" };
    mockRepo.findById.mockResolvedValue(cert as unknown as Certification);
    const result = await useCase.execute("cert-id");
    expect(result).toBe(cert);
  });

  it("should propagate repo errors", async () => {
    mockRepo.findById.mockRejectedValueOnce(new Error("fail"));
    await expect(useCase.execute("x")).rejects.toThrow("fail");
  });
});
