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

jest.mock(
  "../../../../src/contexts/CoreContext/mappers/CertificationMapper",
  () => ({
    __esModule: true,
    default: {
      dtoToDomain: jest.fn().mockReturnValue({
        id: "cert-123",
        certification: "Certification 3412",
        institution: "AWS",
        year: 2015,
        freelancerId: "freelancer-123",
      }),
    },
  })
);

const mockCertification: Certification = CertificationMapper.dtoToDomain({
  id: "cert-123",
  certification: "Certification 3412",
  institution: "AWS",
  year: 2015,
});

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
      execute: jest.fn(),
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
    it("should call GetCertificationsUseCase.execute with the correct id", async () => {
      const id = "freelancer-1";

      const certifications: Certification[] = [mockCertification];

      const result = await service.getByFreelancerId(id);

      expect(getCertificationUseCase.execute).toHaveBeenCalledWith(id);
      expect(result).toEqual(certifications);
    });

    it("should propagate errors from GetCertificationsUseCase.execute", async () => {
      getCertificationUseCase.execute.mockRejectedValueOnce(new Error("fail"));
      await expect(service.getByFreelancerId("id")).rejects.toThrow("fail");
    });

    it("create calls use case with correct payload", async () => {
      await service.create(mockDTO, "freelancer-1");
      expect(createCertificationUseCase.execute).toHaveBeenCalledWith({
        certification: mockDTO,
        freelancerId: "freelancer-1",
      });
    });

    it("delete calls use case with certificationId", async () => {
      await service.delete("cert-123");
      expect(deleteCertificationUseCase.execute).toHaveBeenCalledWith(
        "cert-123"
      );
    });

    it("update transforms DTO and calls use case", async () => {
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

    it("getById calls use case and returns result", async () => {
      getCertificationByIdUseCase.execute.mockResolvedValue(mockCertification);
      const result = await service.getById("cert-123");
      expect(getCertificationByIdUseCase.execute).toHaveBeenCalledWith(
        "cert-123"
      );
      expect(result).toEqual(mockCertification);
    });
  });
});
