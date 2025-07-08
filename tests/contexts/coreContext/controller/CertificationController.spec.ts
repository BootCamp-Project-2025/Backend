import "reflect-metadata";
import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { StatusCodes } from "http-status-codes";
import { CertificationController } from "@/contexts/CoreContext/presentation/http/controllers/CertificationController";

jest.mock("@/contexts/Shared/application/services/ResponseService", () => ({
  ResponseService: {
    send: jest.fn(),
  },
}));

describe("CertificationController", () => {
  const mockService = {
    getAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const controller = new CertificationController(mockService as any);
  const res = {} as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all certifications", async () => {
    const cert = Certification.create(
      { certification: "cert", institution: "inst", year: 2024 },
      new UniqueEntityID("id-1")
    );
    mockService.getAll.mockResolvedValue([cert]);

    const req = { params: { freelancerId: "freelancer-id" } } as any;

    await controller.getAll(req, res);

    expect(mockService.getAll).toHaveBeenCalledWith("freelancer-id");
    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.objectContaining({
        statusCode: StatusCodes.OK,
        message: "Certifications retrieved successfully",
        data: expect.any(Array),
      })
    );
  });

  it("should create a certification", async () => {
    const req = {
      params: { freelancerId: "freelancer-id" },
      body: { certification: "cert", institution: "inst", year: 2024 },
    } as any;

    const cert = Certification.create(
      { certification: "cert", institution: "inst", year: 2024 },
      new UniqueEntityID("cert-id")
    );

    mockService.create.mockResolvedValue(cert);

    await controller.create(req, res);

    expect(mockService.create).toHaveBeenCalledWith(req.body, "freelancer-id");
    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.objectContaining({
        statusCode: StatusCodes.CREATED,
        data: expect.objectContaining({ id: "cert-id" }),
      })
    );
  });

  it("should update a certification", async () => {
    const req = {
      params: { freelancerId: "freelancer-id", certificationId: "cert-id" },
      body: { certification: "updated", institution: "inst", year: 2025 },
    } as any;

    const cert = Certification.create(
      { certification: "updated", institution: "inst", year: 2025 },
      new UniqueEntityID("cert-id")
    );

    mockService.update.mockResolvedValue(cert);

    await controller.update(req, res);

    expect(mockService.update).toHaveBeenCalledWith(
      "cert-id",
      req.body,
      "freelancer-id"
    );
    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.objectContaining({
        statusCode: StatusCodes.OK,
        data: expect.objectContaining({ id: "cert-id" }),
      })
    );
  });

  it("should delete a certification", async () => {
    const req = {
      params: { freelancerId: "freelancer-id", certificationId: "cert-id" },
    } as any;

    await controller.delete(req, res);

    expect(mockService.delete).toHaveBeenCalledWith("cert-id", "freelancer-id");
    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.objectContaining({
        statusCode: StatusCodes.NO_CONTENT,
      })
    );
  });
});
