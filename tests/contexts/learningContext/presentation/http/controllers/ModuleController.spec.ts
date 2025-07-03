import "reflect-metadata";
import { Response } from "express";
import ModuleController from "@/contexts/LearningContext/presentation/http/controllers/ModuleController";
import ModuleMapper from "@/contexts/LearningContext/mappers/ModuleMapper";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { StatusCodes } from "http-status-codes";

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
      body: { id: "asd", name: "Test Module", lessons: [] },
    } as any;
    const mockObject = ModuleMapper.DtoToDomain(req.body);
    ModuleService.create.mockResolvedValue(mockObject);
    const res = mockResponse();

    await controller.create(req, res);

    const response = new SuccessResponseEntity(
      req.body,
      StatusCodes.CREATED,
      "Module saved successfully"
    );

    expect(ModuleService.create).toHaveBeenCalledWith(mockObject);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(response);
  });
});
