import "reflect-metadata";
import { CourseController } from "../../../../../../src/contexts/LearningContext/presentation/http/controllers/CourseController";
import { ICourseService } from "../../../../../../src/contexts/LearningContext/domain/interfaces/ICourseService";
import { Request, Response } from "express";
import { CourseDTO } from "../../../../../../src/contexts/LearningContext/domain/dtos/CourseDTO";

describe("CourseController", () => {
  let controller: CourseController;
  let serviceMock: jest.Mocked<ICourseService>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    serviceMock = {
      getAllCourses: jest.fn(),
      create: jest.fn(),
      updateCourse: jest.fn(),
      deleteCourse: jest.fn(),
    } as any;

    controller = new CourseController(serviceMock);

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
    };
    req = {};
  });

  describe("getAllCourses", () => {
    it("should return 200 and the list of courses", async () => {
      const fake = [{ id: "1", name: "A", description: "D", imgSrc: "I" }];
      serviceMock.getAllCourses.mockResolvedValue(fake);

      await controller.getAllCourses(req as Request, res as Response);

      expect(serviceMock.getAllCourses).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fake);
    });

    it("should return 500 if the service throws", async () => {
      jest.spyOn(console, "error").mockImplementation();
      serviceMock.getAllCourses.mockRejectedValue(new Error("fail"));

      await controller.getAllCourses(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
      (console.error as jest.Mock).mockRestore();
    });
  });

  describe("create", () => {
    it("should call create and return 201 with the new course", async () => {
      const dto: CourseDTO = { name: "N", description: "D", imgSrc: "I" };
      req = { body: dto };
      serviceMock.create.mockResolvedValue(dto);

      await controller.create(req as Request, res as Response);

      expect(serviceMock.create).toHaveBeenCalledWith(dto);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(dto);
    });

    it("should return 500 if create throws", async () => {
      jest.spyOn(console, "error").mockImplementation();
      req = { body: {} as CourseDTO };
      serviceMock.create.mockRejectedValue(new Error("err"));

      await controller.create(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
      (console.error as jest.Mock).mockRestore();
    });
  });

  describe("updateCourse", () => {
    it("should call updateCourse and return 200 with the updated course", async () => {
      const dto: CourseDTO = { name: "U", description: "D", imgSrc: "I" };
      req = { params: { id: "42" }, body: dto };
      serviceMock.updateCourse.mockResolvedValue(dto);

      await controller.updateCourse(req as Request, res as Response);

      expect(serviceMock.updateCourse).toHaveBeenCalledWith("42", dto);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(dto);
    });

    it("should return 500 if updateCourse throws", async () => {
      jest.spyOn(console, "error").mockImplementation();
      req = { params: { id: "42" }, body: {} as CourseDTO };
      serviceMock.updateCourse.mockRejectedValue(new Error("err"));

      await controller.updateCourse(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
      (console.error as jest.Mock).mockRestore();
    });
  });

  describe("deleteCourse", () => {
    it("should call deleteCourse and return 204", async () => {
      req = { params: { id: "99" } };
      serviceMock.deleteCourse.mockResolvedValue();

      await controller.deleteCourse(req as Request, res as Response);

      expect(serviceMock.deleteCourse).toHaveBeenCalledWith("99");
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it("should return 500 if deleteCourse throws", async () => {
      jest.spyOn(console, "error").mockImplementation();
      req = { params: { id: "99" } };
      serviceMock.deleteCourse.mockRejectedValue(new Error("err"));

      await controller.deleteCourse(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
      (console.error as jest.Mock).mockRestore();
    });
  });
});
