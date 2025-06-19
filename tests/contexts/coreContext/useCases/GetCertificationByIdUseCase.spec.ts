import "reflect-metadata";
import { GetCertificationByIdUseCase } from "@/contexts/CoreContext/application/useCases/certifications/GetCertificationByIdUseCase";
import { IFreelancerRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository";
import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";

describe("GetCertificationByIdUseCase", () => {
  const certificationMock = {
    id: { toString: () => "cert-id" },
  } as unknown as Certification;

  const mockFreelancer = {
    certifications: {
      getItems: () => [certificationMock],
    },
  };

  const mockFreelancerRepo: jest.Mocked<IFreelancerRepository> = {
    getById: jest.fn().mockResolvedValue(mockFreelancer),
  } as any;

  const useCase = new GetCertificationByIdUseCase(mockFreelancerRepo);

  it("should return certification from freelancer", async () => {
    const result = await useCase.execute({
      certificationId: "cert-id",
      freelancerId: "freelancer-1",
    });
    expect(result).toBe(certificationMock);
  });

  it("should throw error if certification not found", async () => {
    mockFreelancer.certifications.getItems = () => [];
    await expect(
      useCase.execute({
        certificationId: "not-found",
        freelancerId: "freelancer-1",
      })
    ).rejects.toThrow(ApiError);
  });

  it("should propagate freelancer repository errors", async () => {
    mockFreelancerRepo.getById.mockRejectedValueOnce(new Error("fail"));
    await expect(
      useCase.execute({
        certificationId: "any-id",
        freelancerId: "freelancer-1",
      })
    ).rejects.toThrow("fail");
  });
});
