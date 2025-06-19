import "reflect-metadata";
import { UpdateCertificationUseCase } from "@/contexts/CoreContext/application/useCases/certifications/UpdateCertificationUseCase";
import { ICertificationRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/ICertificationRepository";
import { IFreelancerRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository";
import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";
import { CertificationDTO } from "@/contexts/CoreContext/domain/interfaces/dtos/ICertificationDto";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";

describe("UpdateCertificationUseCase", () => {
  const mockUpdate = jest.fn();
  const mockEdit = jest.fn();

  const certificationMock = {
    id: { toString: () => "cert-id" },
    edit: mockEdit,
  } as unknown as Certification;

  const mockFreelancer = {
    certifications: {
      getItems: () => [certificationMock],
    },
  };

  const mockCertificationRepo: jest.Mocked<ICertificationRepository> = {
    update: mockUpdate,
  } as any;

  const mockFreelancerRepo: jest.Mocked<IFreelancerRepository> = {
    getById: jest.fn().mockResolvedValue(mockFreelancer),
  } as any;

  const useCase = new UpdateCertificationUseCase(
    mockCertificationRepo,
    mockFreelancerRepo
  );

  const input = {
    certificationId: "cert-id",
    certification: {
      id: "cert-id",
      certification: "Test",
      institution: "Test Org",
      year: 2020,
    } satisfies CertificationDTO,
    freelancerId: "freelancer-1",
  };

  it("should update the certification", async () => {
    await useCase.execute(input);
    expect(mockEdit).toHaveBeenCalledWith(input.certification);
    expect(mockUpdate).toHaveBeenCalledWith(
      "cert-id",
      certificationMock,
      "freelancer-1"
    );
  });

  it("should throw if certification not found", async () => {
    mockFreelancer.certifications.getItems = () => [];
    await expect(useCase.execute(input)).rejects.toThrow(ApiError);
  });

  it("should propagate repository errors", async () => {
    mockFreelancer.certifications.getItems = () => [certificationMock];
    mockUpdate.mockRejectedValueOnce(new Error("fail"));
    await expect(useCase.execute(input)).rejects.toThrow("fail");
  });
});
