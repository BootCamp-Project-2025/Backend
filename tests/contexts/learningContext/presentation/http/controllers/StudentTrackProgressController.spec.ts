import "reflect-metadata";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import StudentTrackProgressController from "@/contexts/LearningContext/presentation/http/controllers/StudentTrackProgressController ";
import { IStudentTrackProgressService } from "@/contexts/LearningContext/domain/interfaces/IStudentTrackProgressService";
import { StudentTrackProgress } from "@/contexts/LearningContext/domain/entities/StudentTrackProgress";
import StudentTrackProgressMapper from "@/contexts/LearningContext/mappers/StudentTrackProgressMapper";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";

// Mock dependencies
jest.mock("@/contexts/LearningContext/mappers/StudentTrackProgressMapper");
jest.mock("@/contexts/Shared/application/services/ResponseService");

const mockReq = {
  body: {},
  params: {},
} as unknown as Request;

const mockRes = {} as Response;

const mockTrackProgress = {
  id: { toString: () => "track123" },
  lessonId: "lesson123",
} as unknown as StudentTrackProgress;

const mockStudentProgress = {
  progress: 0.5,
  courseName: "Test Course",
  modules: [],
  courseId: "course123",
  studentTrackProgresses: [],
};

const mockStudentTrackService: IStudentTrackProgressService = {
  create: jest.fn(),
  update: jest.fn(),
  getByEnrollment: jest.fn(),
  getById: jest.fn(),
};

function makeController() {
  return new StudentTrackProgressController(mockStudentTrackService);
}

describe("StudentTrackProgressController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create student track progress successfully", async () => {
      const dto = { lessonId: "lesson123", enrollmentId: "enroll123" };
      mockReq.body = dto;
      mockReq.params = { enrollmentId: "enroll123" };

      (StudentTrackProgressMapper.DtoToDomain as jest.Mock).mockReturnValue(
        mockTrackProgress
      );
      (mockStudentTrackService.create as jest.Mock).mockResolvedValue(
        undefined
      );

      const controller = makeController();
      await controller.create(mockReq, mockRes);

      expect(StudentTrackProgressMapper.DtoToDomain).toHaveBeenCalledWith(dto);
      expect(mockStudentTrackService.create).toHaveBeenCalledWith(
        mockTrackProgress,
        "enroll123"
      );
      expect(ResponseService.send).toHaveBeenCalledWith(
        mockRes,
        expect.objectContaining({
          data: {},
          statusCode: StatusCodes.CREATED,
          message: "Student track progress created successfully",
        })
      );
    });

    it("should throw ApiError when service fails", async () => {
      mockReq.body = { lessonId: "lesson123" };
      mockReq.params = { enrollmentId: "enroll123" };

      (StudentTrackProgressMapper.DtoToDomain as jest.Mock).mockReturnValue(
        mockTrackProgress
      );
      (mockStudentTrackService.create as jest.Mock).mockRejectedValue(
        new Error("Service error")
      );

      const controller = makeController();
      await expect(controller.create(mockReq, mockRes)).rejects.toThrow(
        new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Error accessing the student track service"
        )
      );
    });

    it("should rethrow ApiError from service", async () => {
      const apiError = new ApiError(StatusCodes.BAD_REQUEST, "Bad request");
      mockReq.body = { lessonId: "lesson123" };
      mockReq.params = { enrollmentId: "enroll123" };

      (StudentTrackProgressMapper.DtoToDomain as jest.Mock).mockReturnValue(
        mockTrackProgress
      );
      (mockStudentTrackService.create as jest.Mock).mockRejectedValue(apiError);

      const controller = makeController();
      await expect(controller.create(mockReq, mockRes)).rejects.toThrow(
        apiError
      );
    });
  });

  describe("update", () => {
    it("should update student track progress successfully", async () => {
      const dto = { lessonId: "lesson123", completed: true };
      mockReq.body = dto;
      mockReq.params = { trackId: "track123" };

      (StudentTrackProgressMapper.DtoToDomain as jest.Mock).mockReturnValue(
        mockTrackProgress
      );
      (mockStudentTrackService.update as jest.Mock).mockResolvedValue(
        undefined
      );

      const controller = makeController();
      await controller.update(mockReq, mockRes);

      expect(StudentTrackProgressMapper.DtoToDomain).toHaveBeenCalledWith({
        ...dto,
        id: "track123",
      });
      expect(mockStudentTrackService.update).toHaveBeenCalledWith(
        mockTrackProgress
      );
      expect(ResponseService.send).toHaveBeenCalledWith(
        mockRes,
        expect.objectContaining({
          data: {},
          statusCode: StatusCodes.OK,
          message: "Student track progress updated successfully",
        })
      );
    });

    it("should throw ApiError when update fails", async () => {
      mockReq.body = { lessonId: "lesson123" };
      mockReq.params = { trackId: "track123" };

      (StudentTrackProgressMapper.DtoToDomain as jest.Mock).mockReturnValue(
        mockTrackProgress
      );
      (mockStudentTrackService.update as jest.Mock).mockRejectedValue(
        new Error("Update error")
      );

      const controller = makeController();
      await expect(controller.update(mockReq, mockRes)).rejects.toThrow(
        new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Error updating student track progress"
        )
      );
    });
  });

  describe("getByEnrollment", () => {
    it("should get student progress by enrollment successfully", async () => {
      mockReq.params = { enrollmentId: "enroll123" };
      const mappedResult = { mapped: "data" };

      (mockStudentTrackService.getByEnrollment as jest.Mock).mockResolvedValue(
        mockStudentProgress
      );
      (
        StudentTrackProgressMapper.DomaintoDataStudentProgres as jest.Mock
      ).mockReturnValue(mappedResult);

      const controller = makeController();
      await controller.getByEnrollment(mockReq, mockRes);

      expect(mockStudentTrackService.getByEnrollment).toHaveBeenCalledWith(
        "enroll123"
      );
      expect(
        StudentTrackProgressMapper.DomaintoDataStudentProgres
      ).toHaveBeenCalledWith(mockStudentProgress);
      expect(ResponseService.send).toHaveBeenCalledWith(
        mockRes,
        expect.objectContaining({
          data: mappedResult,
          statusCode: StatusCodes.OK,
          message: "Student track progresses fetched successfully",
        })
      );
    });

    it("should throw ApiError when fetching by enrollment fails", async () => {
      mockReq.params = { enrollmentId: "enroll123" };

      (mockStudentTrackService.getByEnrollment as jest.Mock).mockRejectedValue(
        new Error("Fetch error")
      );

      const controller = makeController();
      await expect(
        controller.getByEnrollment(mockReq, mockRes)
      ).rejects.toThrow(
        new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Error fetching student track progresses"
        )
      );
    });
  });

  describe("getById", () => {
    it("should get student track progress by id successfully", async () => {
      mockReq.params = { trackId: "track123" };

      (mockStudentTrackService.getById as jest.Mock).mockResolvedValue(
        mockTrackProgress
      );

      const controller = makeController();
      await controller.getById(mockReq, mockRes);

      expect(mockStudentTrackService.getById).toHaveBeenCalledWith("track123");
      expect(ResponseService.send).toHaveBeenCalledWith(
        mockRes,
        expect.objectContaining({
          data: mockTrackProgress,
          statusCode: StatusCodes.OK,
          message: "Student track progress fetched successfully",
        })
      );
    });

    it("should throw ApiError when fetching by id fails", async () => {
      mockReq.params = { trackId: "track123" };

      (mockStudentTrackService.getById as jest.Mock).mockRejectedValue(
        new Error("Fetch error")
      );

      const controller = makeController();
      await expect(controller.getById(mockReq, mockRes)).rejects.toThrow(
        new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Error fetching student track progress"
        )
      );
    });

    it("should rethrow ApiError from service", async () => {
      const apiError = new ApiError(StatusCodes.NOT_FOUND, "Not found");
      mockReq.params = { trackId: "track123" };

      (mockStudentTrackService.getById as jest.Mock).mockRejectedValue(
        apiError
      );

      const controller = makeController();
      await expect(controller.getById(mockReq, mockRes)).rejects.toThrow(
        apiError
      );
    });
  });
});
