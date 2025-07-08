import "reflect-metadata";
import { CourseController } from "@/contexts/LearningContext/presentation/http/controllers/CourseController";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { ICourseService } from "@/contexts/LearningContext/domain/interfaces/ICourseService";
import { IEnrollmentService } from "@/contexts/LearningContext/domain/interfaces/IEnrollmentService";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { CourseDTO } from "@/contexts/LearningContext/domain/dtos/CourseDTO";
import { ErrorResponseEntity } from "@/contexts/Shared/domain/entity/ErrorResponseEntity";

jest.mock("@/contexts/Shared/application/services/ResponseService", () => ({
  ResponseService: {
    send: jest.fn(),
  },
}));

describe("CourseController", () => {
  let controller: CourseController;
  let courseServiceMock: jest.Mocked<ICourseService>;
  let enrollServiceMock: jest.Mocked<IEnrollmentService>;
  let req: Partial<Request>, res: Partial<Response>;

  beforeEach(() => {
    courseServiceMock = {
      getAllCourses: jest.fn(),
      create: jest.fn(),
      updateCourse: jest.fn(),
      deleteCourse: jest.fn(),
    };

    enrollServiceMock = {
      enrollInCourse: jest.fn(),
    };

    controller = new CourseController(courseServiceMock, enrollServiceMock);
    req = {};
    res = {} as Response;

    jest.spyOn(ResponseService, "send").mockReturnValue(undefined);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      params: {
        courseId: "course-1",
      },
      body: {
        userId: "user-1",
      },
    } as unknown as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  describe("getAllCourses", () => {
    it("should send 200 with SuccessResponseEntity on success", async () => {
      const fake = [{ id: "1", name: "A", description: "D", imgSrc: "I" }];
      courseServiceMock.getAllCourses.mockResolvedValue(fake);

      await controller.getAllCourses(req as Request, res as Response);

      expect(courseServiceMock.getAllCourses).toHaveBeenCalledTimes(1);
      const [, entity] = (ResponseService.send as jest.Mock).mock.calls[0];
      expect(entity).toBeInstanceOf(SuccessResponseEntity);
      expect((entity as SuccessResponseEntity<CourseDTO>).statusCode).toBe(
        StatusCodes.OK
      );
      expect((entity as SuccessResponseEntity<CourseDTO>).data).toEqual(fake);
    });

    it("should send 500 with ErrorResponseEntity on failure", async () => {
      courseServiceMock.getAllCourses.mockRejectedValue(new Error("boom"));

      await controller.getAllCourses(req as Request, res as Response);

      const [, entity] = (ResponseService.send as jest.Mock).mock.calls[0];
      expect(entity).toBeInstanceOf(ErrorResponseEntity);
      expect((entity as ErrorResponseEntity).statusCode).toBe(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
      expect((entity as ErrorResponseEntity).message).toBe(
        "Internal server error"
      );
    });
  });

  describe("create", () => {
    it("should send 201 with SuccessResponseEntity on success", async () => {
      const dto: CourseDTO = { name: "N", description: "D", imgSrc: "I" };
      req.body = dto;
      courseServiceMock.create.mockResolvedValue(dto);

      await controller.create(req as Request, res as Response);

      expect(courseServiceMock.create).toHaveBeenCalledWith(dto);
      const [, entity] = (ResponseService.send as jest.Mock).mock.calls[0];
      expect(entity).toBeInstanceOf(SuccessResponseEntity);
      expect((entity as SuccessResponseEntity<CourseDTO>).statusCode).toBe(
        StatusCodes.CREATED
      );
      expect((entity as SuccessResponseEntity<CourseDTO>).data).toEqual(dto);
    });

    it("should send 500 with ErrorResponseEntity on failure", async () => {
      req.body = {} as CourseDTO;
      courseServiceMock.create.mockRejectedValue(new Error("err"));

      await controller.create(req as Request, res as Response);

      const [, entity] = (ResponseService.send as jest.Mock).mock.calls[0];
      expect(entity).toBeInstanceOf(ErrorResponseEntity);
      expect((entity as ErrorResponseEntity).statusCode).toBe(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("updateCourse", () => {
    it("should send 200 with SuccessResponseEntity on success", async () => {
      const dto: CourseDTO = { name: "U", description: "D", imgSrc: "I" };
      req.params = { id: "42" };
      req.body = dto;
      courseServiceMock.updateCourse.mockResolvedValue(dto);

      await controller.updateCourse(req as Request, res as Response);

      expect(courseServiceMock.updateCourse).toHaveBeenCalledWith("42", dto);
      const [, entity] = (ResponseService.send as jest.Mock).mock.calls[0];
      expect(entity).toBeInstanceOf(SuccessResponseEntity);
      expect((entity as SuccessResponseEntity<CourseDTO>).statusCode).toBe(
        StatusCodes.OK
      );
      expect((entity as SuccessResponseEntity<CourseDTO>).data).toEqual(dto);
    });

    it("should send 500 with ErrorResponseEntity on failure", async () => {
      req.params = { id: "42" };
      req.body = {} as CourseDTO;
      courseServiceMock.updateCourse.mockRejectedValue(new Error("err"));

      await controller.updateCourse(req as Request, res as Response);

      const [, entity] = (ResponseService.send as jest.Mock).mock.calls[0];
      expect(entity).toBeInstanceOf(ErrorResponseEntity);
      expect((entity as ErrorResponseEntity).statusCode).toBe(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("deleteCourse", () => {
    it("should send SuccessResponseEntity on success (currently 200)", async () => {
      req.params = { id: "99" };
      courseServiceMock.deleteCourse.mockResolvedValue();

      await controller.deleteCourse(req as Request, res as Response);

      expect(courseServiceMock.deleteCourse).toHaveBeenCalledWith("99");
      const [, entity] = (ResponseService.send as jest.Mock).mock.calls[0];
      expect(entity).toBeInstanceOf(SuccessResponseEntity);
      expect((entity as SuccessResponseEntity<CourseDTO>).statusCode).toBe(
        StatusCodes.OK
      );
    });

    it("should send 500 with ErrorResponseEntity on failure", async () => {
      req.params = { id: "99" };
      courseServiceMock.deleteCourse.mockRejectedValue(new Error("err"));

      await controller.deleteCourse(req as Request, res as Response);

      const [, entity] = (ResponseService.send as jest.Mock).mock.calls[0];
      expect(entity).toBeInstanceOf(ErrorResponseEntity);
      expect((entity as ErrorResponseEntity).statusCode).toBe(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("enrollInCourse", () => {
    it("should enroll user in course and send success response", async () => {
      await controller.enrollInCourse(req as Request, res as Response);

      expect(enrollServiceMock.enrollInCourse).toHaveBeenCalledWith(
        "course-1",
        "user-1"
      );
      expect(ResponseService.send).toHaveBeenCalledWith(
        res,
        expect.objectContaining({
          statusCode: StatusCodes.NO_CONTENT,
          message: "Success",
        })
      );
    });

    it("should handle generic error and send internal server error", async () => {
      enrollServiceMock.enrollInCourse.mockRejectedValueOnce(new Error("fail"));

      await controller.enrollInCourse(req as Request, res as Response);

      expect(ResponseService.send).toHaveBeenCalledWith(
        res,
        expect.objectContaining({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          message: "Internal server error",
        })
      );
    });

    it("should handle ApiError and send specific error response", async () => {
      const apiError = new ApiError(
        StatusCodes.BAD_REQUEST,
        "Already enrolled"
      );
      enrollServiceMock.enrollInCourse.mockRejectedValueOnce(apiError);

      await controller.enrollInCourse(req as Request, res as Response);

      expect(ResponseService.send).toHaveBeenCalledWith(
        res,
        expect.objectContaining({
          statusCode: StatusCodes.BAD_REQUEST,
          message: "Already enrolled",
        })
      );
    });
  });
});
