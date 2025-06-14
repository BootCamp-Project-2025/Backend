import "reflect-metadata";
import { GetCertificationsUseCase } from "@/contexts/CoreContext/application/useCases/certifications/GetCertificationUseCase";
import { ICertificationRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/ICertificationRepository";
import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";

describe("GetCertificationsUseCase", () => {
  const mockRepo: jest.Mocked<ICertificationRepository> = {
    findByFreelancerId: jest.fn(),
  } as unknown as jest.Mocked<ICertificationRepository>;

  const useCase = new GetCertificationsUseCase(mockRepo);

  it("should call findByFreelancerId with correct id", async () => {
    await useCase.execute("freelancer-id");
    expect(mockRepo.findByFreelancerId).toHaveBeenCalledWith("freelancer-id");
  });

  it("should return certifications from repo", async () => {
    const certs = [{ id: "1" }];
    mockRepo.findByFreelancerId.mockResolvedValue(
      certs as unknown as Certification[]
    );
    const result = await useCase.execute("freelancer-id");
    expect(result).toBe(certs);
  });

  it("should propagate repo errors", async () => {
    mockRepo.findByFreelancerId.mockRejectedValueOnce(new Error("fail"));
    await expect(useCase.execute("id")).rejects.toThrow("fail");
  });
});
