import "reflect-metadata";
import { Response } from "express";
import LessonController from "@/contexts/LearningContext/presentation/http/controllers/LessonController";
import LessonMapper from "@/contexts/LearningContext/mappers/LessonMapper";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { StatusCodes } from "http-status-codes";
import { LessonDTO } from "@/contexts/LearningContext/domain/dtos/LessonDTO";

const LessonService = {
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("LessonController", () => {
  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };
  const controller = new LessonController(LessonService);
  it("LessonController exist", () => {
    expect(controller).toBeDefined();
  });

  it("should call lessonService create with correct parameters", async () => {
    const req: any = {
      body: {
        id: "testId",
        title: "Test Lesson",
        position: 1,
        description: "",
        videoUrls: [],
        resources: [],
      },
      params: { moduleId: "moduleIdTest" },
    };

    const mockObject = LessonMapper.DtoToDomain({
      id: "testId",
      title: "Test Lesson",
      position: 1,
      description: "",
      videoUrls: [],
      resources: [],
    });
    LessonService.create.mockResolvedValue(mockObject);
    const res = mockResponse();

    await controller.create(req, res);

    const response = new SuccessResponseEntity(
      req.body,
      StatusCodes.CREATED,
      "Lesson saved successfully"
    );
    expect(LessonService.create).toHaveBeenCalledWith(
      mockObject,
      "moduleIdTest"
    );
    expect(res.json).toHaveBeenCalledWith(response);
  });

  it("should call lessonService update with correct parameters", async () => {
    const lesson: LessonDTO = {
      id: "lessonIdTest",
      title: "Test Lesson",
      position: 1,
      description: "",
      videoUrls: [],
      resources: [],
    };
    const req: any = {
      body: {
        title: "Test Lesson",
        position: 1,
        description: "",
        videoUrls: [],
        resources: [],
      },
      params: { lessonId: "lessonIdTest" },
    };
    const mockObject = LessonMapper.DtoToDomain(lesson);
    console.error(mockObject);
    LessonService.update.mockResolvedValue(mockObject);
    const res = mockResponse();

    await controller.update(req, res);

    const response = new SuccessResponseEntity(
      lesson,
      StatusCodes.OK,
      "Lesson updated successfully"
    );
    expect(LessonService.update).toHaveBeenCalledWith(mockObject);
    expect(res.json).toHaveBeenCalledWith(response);
  });
  it("should call lessonService delete with correct parameters", async () => {
    const res = mockResponse();
    const req = { params: { lessonId: "lessonIdTest" } } as any;

    await controller.delete(req, res);

    const response = new SuccessResponseEntity(
      {},
      StatusCodes.OK,
      "Lesson deleted successfully"
    );
    expect(LessonService.delete).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(response);
  });
});
