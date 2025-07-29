import "reflect-metadata";
import { EnrollmentController } from "@/contexts/CoreContext/presentation/http/controllers/EnrollmentController";
import { IEnrollmentService } from "@/contexts/CoreContext/domain/interfaces/services/IEnrollmentService";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { EnrollmentMapper } from "@/contexts/CoreContext/mappers/EnrollmentMapper";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { Enrollment } from "@/contexts/CoreContext/domain/aggregates/Enrollment";

jest.mock("@/contexts/CoreContext/mappers/EnrollmentMapper");
jest.mock("@/contexts/Shared/application/services/ResponseService");

describe("EnrollmentController", () => {
  let enrollmentService: jest.Mocked<IEnrollmentService>;
  let controller: EnrollmentController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    enrollmentService = {
      create: jest.fn(),
      cancel: jest.fn(),
      getEnrollments: jest.fn(),
    } as jest.Mocked<IEnrollmentService>;
    controller = new EnrollmentController(enrollmentService);

    req = {
      body: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("createEnrollment", () => {
    it("should throw ApiError if enrollmentDto is missing", async () => {
      req.body = undefined as unknown;
      await expect(
        controller.createEnrollment(req as Request, res as Response)
      ).rejects.toThrowError(ApiError);
    });

    it("should call EnrollmentService.create and send response", async () => {
      const enrollmentDto = { foo: "bar" };
      const domainEnrollment = { id: "domain" };
      const savedEnrollment = { id: "saved" } as unknown as Enrollment;
      const mappedDto = { id: "dto" };

      req.body = enrollmentDto;

      (EnrollmentMapper.createDtoToDomain as jest.Mock).mockReturnValue(
        domainEnrollment
      );
      enrollmentService.create.mockResolvedValue(savedEnrollment);
      (EnrollmentMapper.domainToDto as jest.Mock).mockReturnValue(mappedDto);

      await controller.createEnrollment(req as Request, res as Response);

      expect(EnrollmentMapper.createDtoToDomain).toHaveBeenCalledWith(
        enrollmentDto
      );
      expect(enrollmentService.create).toHaveBeenCalledWith(domainEnrollment);
      expect(EnrollmentMapper.domainToDto).toHaveBeenCalledWith(
        savedEnrollment
      );

      expect(ResponseService.send).toHaveBeenCalledWith(
        res,
        expect.any(SuccessResponseEntity)
      );
      const responseArg = (ResponseService.send as jest.Mock).mock.calls[0][1];
      expect(responseArg.data).toEqual(mappedDto);
      expect(responseArg.statusCode).toBe(StatusCodes.CREATED);
    });
  });

  describe("cancelEnrollment", () => {
    it("should throw ApiError if enrollmentId is missing", async () => {
      req.params = {};
      await expect(
        controller.cancelEnrollment(req as Request, res as Response)
      ).rejects.toThrowError(ApiError);
    });

    it("should call EnrollmentService.cancel and send response", async () => {
      req.params = { id: "enroll123" };

      await controller.cancelEnrollment(req as Request, res as Response);

      expect(enrollmentService.cancel).toHaveBeenCalledWith("enroll123");
      expect(ResponseService.send).toHaveBeenCalledWith(
        res,
        expect.any(SuccessResponseEntity)
      );
      const responseArg = (ResponseService.send as jest.Mock).mock.calls[0][1];
      expect(responseArg.data).toEqual({
        message: "Enrollment canceled successfully",
      });
      expect(responseArg.statusCode).toBe(StatusCodes.OK);
    });
  });

  describe("getEnrollments", () => {
    it("should call EnrollmentService.getEnrollments and send response", async () => {
      const userId = "user123";
      const domainEnrollments = [
        { id: "1" },
        { id: "2" },
      ] as unknown as Enrollment[];

      const mappedDtos = [{ id: "dto1" }, { id: "dto2" }];

      req.params = { userId };

      enrollmentService.getEnrollments.mockResolvedValue(domainEnrollments);
      (EnrollmentMapper.domainToDto as jest.Mock).mockImplementation((e) =>
        mappedDtos.find((dto) => dto.id === `dto${e.id}`)
      );

      await controller.getEnrollments(req as Request, res as Response);

      expect(enrollmentService.getEnrollments).toHaveBeenCalledWith(userId);
      expect(EnrollmentMapper.domainToDto).toHaveBeenCalledTimes(2);
      expect(ResponseService.send).toHaveBeenCalledWith(
        res,
        expect.any(SuccessResponseEntity)
      );

      const responseArg = (ResponseService.send as jest.Mock).mock.calls[0][1];
      expect(responseArg.data).toEqual(mappedDtos);
      expect(responseArg.statusCode).toBe(StatusCodes.OK);
      expect(responseArg.message).toBe("Enrollments retrieved successfully");
    });

    it("should throw ApiError on internal error", async () => {
      const userId = "user123";
      req.params = { userId };
      enrollmentService.getEnrollments.mockRejectedValue(new Error("DB error"));

      await expect(
        controller.getEnrollments(req as Request, res as Response)
      ).rejects.toThrow(ApiError);
    });
  });
});
