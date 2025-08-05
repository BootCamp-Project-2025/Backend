jest.spyOn(console, "error").mockImplementation(() => undefined);

import "reflect-metadata";
import { CourseController } from "../../../../../../src/contexts/LearningContext/presentation/http/controllers/CourseController";
import { ICourseService } from "../../../../../../src/contexts/LearningContext/domain/interfaces/ICourseService";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseService } from "../../../../../../src/contexts/Shared/application/services/ResponseService";
import { SuccessResponseEntity } from "../../../../../../src/contexts/Shared/domain/entity/SuccessResponseEntity";
import { ErrorResponseEntity } from "../../../../../../src/contexts/Shared/domain/entity/ErrorResponseEntity";
import { CourseDTO } from "../../../../../../src/contexts/LearningContext/domain/dtos/CourseDTO";

describe("CourseController", () => {
  let controller: CourseController;
  let serviceMock: jest.Mocked<ICourseService>;
  let req: Partial<Request>, res: Partial<Response>;

  beforeEach(() => {
    serviceMock = {
      getAllCourses: jest.fn(),
      getCourse: jest.fn(),
      editCourse: jest.fn(),
      create: jest.fn(),
      updateCourse: jest.fn(),
      deleteCourse: jest.fn(),
      publish: jest.fn(),
      searchCourse: jest.fn(),
    };

    controller = new CourseController(serviceMock);
    req = {};
    res = {} as Response;

    jest.spyOn(ResponseService, "send").mockReturnValue(undefined);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAllCourses", () => {
    it("should send 200 with SuccessResponseEntity on success", async () => {
      const fake = [
        { id: "1", name: "A", description: "D", imgSrc: "I", userId: "U" },
      ];
      serviceMock.getAllCourses.mockResolvedValue(fake);

      await controller.getAllCourses(req as Request, res as Response);

      expect(serviceMock.getAllCourses).toHaveBeenCalledTimes(1);
      const [, entity] = (ResponseService.send as jest.Mock).mock.calls[0];
      expect(entity).toBeInstanceOf(SuccessResponseEntity);
      expect((entity as SuccessResponseEntity<CourseDTO>).statusCode).toBe(
        StatusCodes.OK
      );
      expect((entity as SuccessResponseEntity<CourseDTO>).data).toEqual(fake);
    });

    // it("should send 500 with ErrorResponseEntity on failure", async () => {
    //   serviceMock.getAllCourses.mockRejectedValue(new Error("boom"));

    //   await controller.getAllCourses(req as Request, res as Response);

    //   const [, entity] = (ResponseService.send as jest.Mock).mock.calls[0];
    //   expect(entity).toBeInstanceOf(ErrorResponseEntity);
    //   expect((entity as ErrorResponseEntity).statusCode).toBe(
    //     StatusCodes.INTERNAL_SERVER_ERROR
    //   );
    //   expect((entity as ErrorResponseEntity).message).toBe(
    //     "Internal server error"
    //   );
    // });
  });

  describe("create", () => {
    it("should send 201 with SuccessResponseEntity on success", async () => {
      const dto: CourseDTO = {
        name: "N",
        description: "D",
        imgSrc: "I",
        userId: "U",
      };
      req.user = {
        id: "U",
        email: "email",
        name: "name",
      };
      req.body = { name: "N", description: "D", imgSrc: "I" };
      serviceMock.create.mockResolvedValue(dto);

      await controller.create(req as Request, res as Response);

      expect(serviceMock.create).toHaveBeenCalledWith(dto);
      const [, entity] = (ResponseService.send as jest.Mock).mock.calls[0];
      expect(entity).toBeInstanceOf(SuccessResponseEntity);
      expect((entity as SuccessResponseEntity<CourseDTO>).statusCode).toBe(
        StatusCodes.CREATED
      );
      expect((entity as SuccessResponseEntity<CourseDTO>).data).toEqual(dto);
    });

    it("should send 500 with ErrorResponseEntity on failure", async () => {
      req.body = {} as CourseDTO;
      serviceMock.create.mockRejectedValue(new Error("err"));

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
      const dto: CourseDTO = {
        name: "U",
        description: "D",
        imgSrc: "I",
        userId: "U",
      };
      req.params = { id: "42" };
      req.body = dto;
      serviceMock.editCourse.mockResolvedValue(dto);

      await controller.editCourse(req as Request, res as Response);

      expect(serviceMock.editCourse).toHaveBeenCalledWith("42", dto);
      const [, entity] = (ResponseService.send as jest.Mock).mock.calls[0];
      expect(entity).toBeInstanceOf(SuccessResponseEntity);
      expect((entity as SuccessResponseEntity<CourseDTO>).statusCode).toBe(
        StatusCodes.OK
      );
      expect((entity as SuccessResponseEntity<CourseDTO>).data).toEqual(dto);
    });

    // it("should send 500 with ErrorResponseEntity on failure", async () => {
    //   req.params = { id: "42" };
    //   req.body = {} as CourseDTO;
    //   serviceMock.editCourse.mockRejectedValue(new Error("err"));

    //   await controller.editCourse(req as Request, res as Response);

    //   const [, entity] = (ResponseService.send as jest.Mock).mock.calls[0];
    //   expect(entity).toBeInstanceOf(ErrorResponseEntity);
    //   expect((entity as ErrorResponseEntity).statusCode).toBe(
    //     StatusCodes.INTERNAL_SERVER_ERROR
    //   );
    // });
  });

  describe("deleteCourse", () => {
    it("should send SuccessResponseEntity on success (currently 200)", async () => {
      req.params = { id: "99" };
      serviceMock.deleteCourse.mockResolvedValue();

      await controller.delete(req as Request, res as Response);

      expect(serviceMock.deleteCourse).toHaveBeenCalledWith("99");
      const [, entity] = (ResponseService.send as jest.Mock).mock.calls[0];
      expect(entity).toBeInstanceOf(SuccessResponseEntity);
      expect((entity as SuccessResponseEntity<CourseDTO>).statusCode).toBe(
        StatusCodes.NO_CONTENT
      );
    });

    // it("should send 500 with ErrorResponseEntity on failure", async () => {
    //   req.params = { id: "99" };
    //   serviceMock.deleteCourse.mockRejectedValue(new Error("err"));

    //   await controller.delete(req as Request, res as Response);

    //   const [, entity] = (ResponseService.send as jest.Mock).mock.calls[0];
    //   expect(entity).toBeInstanceOf(ErrorResponseEntity);
    //   expect((entity as ErrorResponseEntity).statusCode).toBe(
    //     StatusCodes.INTERNAL_SERVER_ERROR
    //   );
    // });
  });
});
