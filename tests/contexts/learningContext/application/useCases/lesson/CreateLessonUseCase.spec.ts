import "reflect-metadata";

import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import ILessonRepository from "@/contexts/LearningContext/domain/interfaces/ILessonRepository";
import CreateLessonUseCase from "@/contexts/LearningContext/application/useCases/lesson/CreateLessonUseCase";
import LessonMapper from "@/contexts/LearningContext/mappers/LessonMapper";
import IModuleRepository from "@/contexts/LearningContext/domain/interfaces/IModuleRepository";
import ModuleMapper from "@/contexts/LearningContext/mappers/ModuleMapper";
import { ICourseRepository } from "@/contexts/LearningContext/domain/interfaces/ICourseRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Module } from "@/contexts/LearningContext/domain/entities/Module";
import { CourseMapper } from "@/contexts/LearningContext/mappers/CourseMapper";

const mockRepository: jest.Mocked<ILessonRepository> = {
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
};

const mockModuleRepository: jest.Mocked<IModuleRepository> = {
  findById: jest.fn(),
  findByCourseId: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findCourseIdByModuleId: jest.fn(),
};

const mockCourseRepository: jest.Mocked<ICourseRepository> = {
  findAll: jest.fn(),
  findById: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  publish: jest.fn(),
};

const mockGetAllModulesUseCase: jest.Mocked<IUseCase<string, Module[]>> = {
  execute: jest.fn(),
};

const useCase = new CreateLessonUseCase(
  mockModuleRepository,
  mockRepository,
  mockCourseRepository,
  mockGetAllModulesUseCase
);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("CreateLessonUseCase", () => {
  it("exist", () => {
    expect(useCase).toBeDefined();
  });
  it("Create lesson correctly", async () => {
    const lesson = LessonMapper.DtoToDomain({
      id: "testId",
      title: "Test Lesson",
      position: 1,
      description: "12345123451234512345123451234512345",
      videoUrls: [],
      resources: [],
    });
    const module = ModuleMapper.DtoToDomain({
      id: "asd",
      title: "Test Module",
      lessons: [],
      position: 1,
      quizzes: [],
    });

    mockModuleRepository.findById.mockResolvedValue(module);
    mockRepository.create.mockResolvedValue(lesson);

    const result = await useCase.execute({
      lesson,
      moduleId: "module-id",
    });

    expect(result).toBe(lesson);
    expect(mockModuleRepository.findById).toHaveBeenCalledWith("module-id");
    expect(mockRepository.create).toHaveBeenCalledWith(lesson, "module-id");
  });

  it("Module not found", () => {
    const lesson = LessonMapper.DtoToDomain({
      id: "testId",
      title: "Test Lesson",
      position: 1,
      description: "12345123451234512345123451234512345",
      videoUrls: [],
      resources: [],
    });
    mockModuleRepository.findById.mockResolvedValue(null);
    mockRepository.create.mockResolvedValue(lesson);
    expect(
      async () => await useCase.execute({ lesson, moduleId: "testModuleId" })
    ).rejects.toThrow(ApiError);
  });
});
