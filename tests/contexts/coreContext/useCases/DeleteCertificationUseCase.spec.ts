import "reflect-metadata";
import { DeleteCertificationUseCase } from "@/contexts/CoreContext/application/useCases/certifications/DeleteCertificationUseCase";
import { ICertificationRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/ICertificationRepository";
import { IFreelancerRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";

describe("DeleteCertificationUseCase", () => {
  const mockDelete = jest.fn();
  const mockRemove = jest.fn();

  const certificationMock = { id: { toString: () => "cert-1" } };

  const mockFreelancer = {
    certifications: {
      getItems: () => [certificationMock],
      remove: mockRemove,
    },
  };

  const mockCertRepo: jest.Mocked<ICertificationRepository> = {
    delete: mockDelete,
  } as any;

  const mockFreelancerRepo: jest.Mocked<IFreelancerRepository> = {
    getById: jest.fn().mockResolvedValue(mockFreelancer),
  } as any;

  const useCase = new DeleteCertificationUseCase(
    mockCertRepo,
    mockFreelancerRepo
  );

  it("should delete the certification and remove it from the freelancer", async () => {
    await useCase.execute({
      certificationId: "cert-1",
      freelancerId: "freelancer-1",
    });

    expect(mockCertRepo.delete).toHaveBeenCalledWith("cert-1");
    expect(mockRemove).toHaveBeenCalledWith(certificationMock);
  });

  it("should throw error if certification is not found", async () => {
    mockFreelancer.certifications.getItems = () => [];

    await expect(
      useCase.execute({
        certificationId: "not-found",
        freelancerId: "freelancer-1",
      })
    ).rejects.toThrow(ApiError);
  });

  it("should propagate errors from certificationRepository", async () => {
    mockFreelancer.certifications.getItems = () => [certificationMock];
    mockCertRepo.delete.mockRejectedValueOnce(new Error("fail"));

    await expect(
      useCase.execute({
        certificationId: "cert-1",
        freelancerId: "freelancer-1",
      })
    ).rejects.toThrow("fail");
  });
});
