import "reflect-metadata";
import { UpdateCertificationUseCase } from "@/contexts/CoreContext/application/useCases/certifications/UpdateCertificationUseCase";
import { ICertificationRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/ICertificationRepository";
import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";

describe("UpdateCertificationUseCase", () => {
  const mockRepo: jest.Mocked<ICertificationRepository> = {
    update: jest.fn(),
  } as unknown as jest.Mocked<ICertificationRepository>;

  const useCase = new UpdateCertificationUseCase(mockRepo);

  const input = {
    certificationId: "cert-id",
    certification: {
      id: "cert-id",
      certification: "Test",
      institution: "Test Org",
      year: 2020,
      freelancerId: "freelancer-1",
    } as unknown as Certification,
    freelancerId: "freelancer-1",
  };

  it("should call update with correct values", async () => {
    await useCase.execute(input);
    expect(mockRepo.update).toHaveBeenCalledWith(
      input.certificationId,
      input.certification,
      input.freelancerId
    );
  });

  it("should propagate repo errors", async () => {
    mockRepo.update.mockRejectedValueOnce(new Error("fail"));
    await expect(useCase.execute(input)).rejects.toThrow("fail");
  });
});
