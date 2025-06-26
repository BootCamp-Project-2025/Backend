import "reflect-metadata";
import {
  Course,
  CourseProps,
} from "@/contexts/LearningContext/domain/aggregates/Course";
import { CourseDescription } from "@/contexts/LearningContext/domain/valueObjects/CourseDescription";
import { CourseName } from "@/contexts/LearningContext/domain/valueObjects/CourseName";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { CourseController } from "@/contexts/LearningContext/presentation/http/controllers/CourseController";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { StatusCodes } from "http-status-codes";

jest.mock("@/contexts/Shared/application/services/ResponseService", () => ({
  ResponseService: {
    send: jest.fn(),
  },
}));

const mockService = {
  getCourse: jest.fn(),
  deleteCourse: jest.fn(),
  editCourse: jest.fn(),
};

const controller = new CourseController(mockService as any);

const empyCourseProps: CourseProps = {
  name: CourseName.create({ name: "name" }),
  description: CourseDescription.create({ description: "course" }),
  imgSrc: "dsadsa",
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Course controller tests", () => {
  it("exist", () => {
    expect(CourseController).toBeDefined;
  });
  it("gets course correctly", async () => {
    const res = {} as any;
    const req = { params: { id: "testId" } } as any;
    const course = Course.create(empyCourseProps, new UniqueEntityID("testId"));
    mockService.getCourse.mockResolvedValue(course);

    await controller.getCourse(req, res);

    expect(mockService.getCourse).toHaveBeenCalledWith("testId");
    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.objectContaining({
        statusCode: StatusCodes.OK,
        data: expect.any(Object),
        success: true,
      })
    );
  });
  it("edits course correctly", async () => {
    const res = {} as any;
    const req = {
      params: { id: "testId" },
      body: { name: "name", description: "des", imgSrc: "imageLink" },
    } as any;
    const course = Course.create(empyCourseProps, new UniqueEntityID("testId"));
    mockService.editCourse.mockResolvedValue(course);

    await controller.editCourse(req, res);

    expect(mockService.editCourse).toHaveBeenCalledWith("testId", {
      name: "name",
      description: "des",
      imgSrc: "imageLink",
    });
    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.objectContaining({
        statusCode: StatusCodes.OK,
        data: expect.any(Object),
        success: true,
      })
    );
  });
  it("delete course correctly", async () => {
    const res = {} as any;
    const req = { params: { id: "testId" } } as any;
    mockService.getCourse.mockResolvedValue(undefined);

    await controller.delete(req, res);

    expect(mockService.deleteCourse).toHaveBeenCalledWith("testId");
    expect(ResponseService.send).toHaveBeenCalledWith(
      res,
      expect.objectContaining({
        statusCode: StatusCodes.OK,
        success: true,
      })
    );
  });
});
