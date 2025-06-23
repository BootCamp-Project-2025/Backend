import "reflect-metadata";
import { GetCertificationsUseCase } from "@/contexts/CoreContext/application/useCases/certifications/GetCertificationUseCase";
import { IFreelancerRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository";
import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";

describe("GetCertificationsUseCase", () => {
  const certificationsMock = [
    { id: { toString: () => "1" } },
    { id: { toString: () => "2" } },
  ] as unknown as Certification[];

  const mockFreelancer = {
    certifications: {
      getItems: () => certificationsMock,
    },
  };

  const mockFreelancerRepo: jest.Mocked<IFreelancerRepository> = {
    getById: jest.fn().mockResolvedValue(mockFreelancer),
  } as any;

  const useCase = new GetCertificationsUseCase(mockFreelancerRepo);

  it("should return certifications from freelancer", async () => {
    const result = await useCase.execute("freelancer-id");
    expect(result).toBe(certificationsMock);
  });

  it("should throw error if freelancer not found", async () => {
    mockFreelancerRepo.getById.mockResolvedValueOnce(null);
    await expect(useCase.execute("unknown-id")).rejects.toThrow(
      "Freelancer not found"
    );
  });

  it("should propagate repository errors", async () => {
    mockFreelancerRepo.getById.mockRejectedValueOnce(new Error("fail"));
    await expect(useCase.execute("freelancer-id")).rejects.toThrow("fail");
  });
});
