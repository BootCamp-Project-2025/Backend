import "reflect-metadata";
import { CertificationService } from "@/contexts/CoreContext/application/services/CertificationService";
import { CreateCertificationUseCase } from "@/contexts/CoreContext/application/useCases/certifications/CreateCertificationUseCase";
import { DeleteCertificationUseCase } from "@/contexts/CoreContext/application/useCases/certifications/DeleteCertificationUseCase";
import { GetCertificationByIdUseCase } from "@/contexts/CoreContext/application/useCases/certifications/GetCertificationByIdUseCase";
import { GetCertificationsUseCase } from "@/contexts/CoreContext/application/useCases/certifications/GetCertificationUseCase";
import { UpdateCertificationUseCase } from "@/contexts/CoreContext/application/useCases/certifications/UpdateCertificationUseCase";
import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";
import { CertificationDTO } from "@/contexts/CoreContext/domain/interfaces/dtos/ICertificationDto";
import CertificationMapper from "@/contexts/CoreContext/mappers/CertificationMapper";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";

jest.mock("@/contexts/CoreContext/mappers/CertificationMapper", () => ({
  __esModule: true,
  default: {
    dtoToDomain: jest.fn().mockReturnValue({
      id: "cert-123",
      certification: "Certification 3412",
      institution: "AWS",
      year: 2015,
      freelancerId: "freelancer-123",
    }),
    domainToDto: jest.fn().mockReturnValue({
      id: "cert-123",
      certification: "Certification 3412",
      institution: "AWS",
      year: 2015,
    }),
  },
}));

const mockCertification: Certification = CertificationMapper.dtoToDomain(
  {
    id: "cert-123",
    certification: "Certification 3412",
    institution: "AWS",
    year: 2015,
  },
  "cert-123"
);

const mockDTO: CertificationDTO = {
  id: "cert-123",
  certification: "Certification 3412",
  institution: "AWS",
  year: 2015,
};

describe("CertificationService", () => {
  let getCertificationUseCase: jest.Mocked<GetCertificationsUseCase>;
  let createCertificationUseCase: jest.Mocked<CreateCertificationUseCase>;
  let updateCertificationUseCase: jest.Mocked<UpdateCertificationUseCase>;
  let deleteCertificationUseCase: jest.Mocked<DeleteCertificationUseCase>;
  let getCertificationByIdUseCase: jest.Mocked<GetCertificationByIdUseCase>;
  let service: CertificationService;

  beforeEach(() => {
    getCertificationUseCase = {
      execute: jest.fn().mockResolvedValue([mockCertification]),
    } as unknown as jest.Mocked<GetCertificationsUseCase>;

    createCertificationUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<CreateCertificationUseCase>;

    updateCertificationUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<UpdateCertificationUseCase>;

    deleteCertificationUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<DeleteCertificationUseCase>;

    getCertificationByIdUseCase = {
      execute: jest.fn().mockResolvedValue(mockCertification),
    } as unknown as jest.Mocked<GetCertificationByIdUseCase>;

    service = new CertificationService(
      getCertificationUseCase,
      createCertificationUseCase,
      updateCertificationUseCase,
      deleteCertificationUseCase,
      getCertificationByIdUseCase
    );
  });

  describe("getByFreelancerId", () => {
    it("should return mapped DTOs from GetCertificationsUseCase", async () => {
      const result = await service.getByFreelancerId("freelancer-1");

      expect(getCertificationUseCase.execute).toHaveBeenCalledWith(
        "freelancer-1"
      );
      expect(CertificationMapper.domainToDto).toHaveBeenCalledTimes(1);
      expect(result).toEqual([mockDTO]);
    });

    it("should propagate errors from GetCertificationsUseCase", async () => {
      getCertificationUseCase.execute.mockRejectedValueOnce(new Error("fail"));
      await expect(service.getByFreelancerId("id")).rejects.toThrow("fail");
    });
  });

  describe("create", () => {
    it("should call CreateCertificationUseCase with correct args", async () => {
      await service.create(mockDTO, "freelancer-1");
      expect(createCertificationUseCase.execute).toHaveBeenCalledWith({
        certification: mockDTO,
        freelancerId: "freelancer-1",
      });
    });
  });

  describe("delete", () => {
    it("should call DeleteCertificationUseCase if certification exists", async () => {
      await service.delete("cert-123");
      expect(getCertificationByIdUseCase.execute).toHaveBeenCalledWith(
        "cert-123"
      );
      expect(deleteCertificationUseCase.execute).toHaveBeenCalledWith(
        "cert-123"
      );
    });

    it("should throw ApiError if certification not found", async () => {
      getCertificationByIdUseCase.execute.mockResolvedValueOnce(null);
      await expect(service.delete("invalid")).rejects.toThrow(ApiError);
    });
  });

  describe("update", () => {
    it("should call UpdateCertificationUseCase with correct args", async () => {
      await service.update("cert-123", mockDTO, "freelancer-1");

      expect(CertificationMapper.dtoToDomain).toHaveBeenCalledWith(
        mockDTO,
        "cert-123"
      );
      expect(updateCertificationUseCase.execute).toHaveBeenCalledWith({
        certificationId: "cert-123",
        certification: mockCertification,
        freelancerId: "freelancer-1",
      });
    });

    it("should throw ApiError if certification not found", async () => {
      getCertificationByIdUseCase.execute.mockResolvedValueOnce(null);
      await expect(
        service.update("invalid", mockDTO, "freelancer-1")
      ).rejects.toThrow(ApiError);
    });
  });

  describe("getById", () => {
    it("should return mapped DTO from domain", async () => {
      const result = await service.getById("cert-123");
      expect(getCertificationByIdUseCase.execute).toHaveBeenCalledWith(
        "cert-123"
      );
      expect(CertificationMapper.domainToDto).toHaveBeenCalledWith(
        mockCertification
      );
      expect(result).toEqual(mockDTO);
    });

    it("should throw ApiError if certification not found", async () => {
      getCertificationByIdUseCase.execute.mockResolvedValueOnce(null);
      await expect(service.getById("invalid")).rejects.toThrow(ApiError);
    });
  });
});
