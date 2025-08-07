import "reflect-metadata";

import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import IModuleRepository from "@/contexts/LearningContext/domain/interfaces/IModuleRepository";
import CreateModuleUseCase from "@/contexts/LearningContext/application/useCases/module/CreateModuleUseCase";
import { ICourseRepository } from "@/contexts/LearningContext/domain/interfaces/ICourseRepository";
import ModuleMapper from "@/contexts/LearningContext/mappers/ModuleMapper";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Module } from "@/contexts/LearningContext/domain/entities/Module";
import { CourseMapper } from "@/contexts/LearningContext/mappers/CourseMapper";

jest.mock("@/eventRegister", () => ({
  globalEventDispatcher: {
    dispatch: jest.fn(),
  },
}));

const mockRepository: jest.Mocked<IModuleRepository> = {
  create: jest.fn(),
  findByCourseId: jest.fn(),
  findById: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findCourseIdByModuleId: jest.fn(),
};

const mockCourseRepository: jest.Mocked<ICourseRepository> = {
  findById: jest.fn(),
  findAll: jest.fn(),
  insert: jest.fn(),
  publish: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockGetAllModulesUseCase: jest.Mocked<IUseCase<string, Module[]>> = {
  execute: jest.fn(),
};

const useCase = new CreateModuleUseCase(mockRepository, mockCourseRepository);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("CreateModuleUseCase", () => {
  it("exist", () => {
    expect(useCase).toBeDefined();
  });
  it("Create module correctly", () => {
    const module = ModuleMapper.DtoToDomain({
      id: "asd",
      title: "Test Module",
      lessons: [],
      position: 1,
      quizzes: [],
    });
    const course = CourseMapper.toDomain({
      name: "CourseTest",
      id: "CourseTestId",
      field: "CourseTestField",
      requirements: "CourseTestRequirements",
      time: 0,
      description: "CourseTestDescription",
      imgSrc: "CourseTestImage",
      language: "",
      category: "",
      subCategory: "",
      published: false,
      userId: "userId",
    });
    mockCourseRepository.findById.mockResolvedValue(course);
    mockRepository.create.mockResolvedValue(module);
    mockGetAllModulesUseCase.execute.mockResolvedValue([module]);
    expect(useCase.execute({ module, courseId: "CourseTestId" })).resolves.toBe(
      module
    );
  });

  it("Course not found", async () => {
    const module = ModuleMapper.DtoToDomain({
      id: "asd",
      title: "Test Module",
      lessons: [],
      position: 1,
      quizzes: [],
    });
    mockCourseRepository.findById.mockResolvedValue(null);
    mockRepository.create.mockResolvedValue(module);
    await expect(
      async () => await useCase.execute({ module, courseId: "CourseTestId" })
    ).rejects.toThrow(ApiError);
  });
});
