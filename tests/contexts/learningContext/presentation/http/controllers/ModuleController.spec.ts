import "reflect-metadata";
import { Response } from "express";
import ModuleController from "@/contexts/LearningContext/presentation/http/controllers/ModuleController";
import ModuleMapper from "@/contexts/LearningContext/mappers/ModuleMapper";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { StatusCodes } from "http-status-codes";
import { ModuleDTO } from "@/contexts/LearningContext/domain/dtos/ModuleDTO";

const ModuleService = {
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ModuleController", () => {
  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };
  const controller = new ModuleController(ModuleService);
  it("ModuleController exist", () => {
    expect(controller).toBeDefined();
  });

  it("should call moduleService create with correct parameters", async () => {
    const req = {
      body: {
        id: "asd",
        title: "Test Module",
        lessons: [],
        position: 1,
        quizzes: [],
      },
      params: { courseId: "courseIdTest" },
    } as any;
    const mockObject = ModuleMapper.DtoToDomain({
      id: "asd",
      title: "Test Module",
      lessons: [],
      position: 1,
      quizzes: [],
    });
    ModuleService.create.mockResolvedValue(mockObject);
    const res = mockResponse();

    await controller.create(req, res);

    const response = new SuccessResponseEntity(
      req.body,
      StatusCodes.CREATED,
      "Module saved successfully"
    );
    expect(ModuleService.create).toHaveBeenCalledWith(
      mockObject,
      "courseIdTest"
    );
    expect(res.json).toHaveBeenCalledWith(response);
  });

  it("should call moduleService update with correct parameters", async () => {
    const module: ModuleDTO = {
      id: "12345",
      title: "Test Module",
      lessons: [],
      position: 1,
      quizzes: [],
    };
    const req = {
      body: {
        title: module.title,
        lessons: module.lessons,
        position: module.position,
        quizzes: [],
      },
      params: {
        moduleId: module.id,
      },
    } as any;
    const mockObject = ModuleMapper.DtoToDomain(module);
    ModuleService.update.mockResolvedValue(mockObject);
    const res = mockResponse();

    await controller.update(req, res);

    const response = new SuccessResponseEntity(
      module,
      StatusCodes.OK,
      "Module updated successfully"
    );
    expect(ModuleService.update).toHaveBeenCalledWith(mockObject);
    expect(res.json).toHaveBeenCalledWith(response);
  });
  it("should call moduleService delete with correct parameters", async () => {
    const res = mockResponse();
    const req = { params: { moduleId: "testId" } } as any;

    await controller.delete(req, res);

    const response = new SuccessResponseEntity(
      {},
      StatusCodes.OK,
      "Module deleted successfully"
    );
    expect(ModuleService.delete).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(response);
  });

  it("should call moduleService getAll with correct parameters", async () => {
    const modules: ModuleDTO[] = [
      {
        id: "12345",
        title: "Test Module",
        lessons: [],
        position: 1,
        quizzes: [],
      },
      {
        id: "123456",
        title: "Test Module2",
        lessons: [],
        position: 1,
        quizzes: [],
      },
    ];
    const req = {
      params: { courseId: "courseIdTest" },
    } as any;
    const mockObjects = ModuleMapper.bulkDtoToDomain(modules);
    ModuleService.getAll.mockResolvedValue(mockObjects);
    const res = mockResponse();

    await controller.getAll(req, res);

    const response = new SuccessResponseEntity(
      modules,
      StatusCodes.OK,
      "Obtained modules successfully"
    );
    expect(ModuleService.getAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(response);
  });
});
