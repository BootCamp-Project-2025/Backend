import "reflect-metadata";

import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import IModuleRepository from "@/contexts/LearningContext/domain/interfaces/IModuleRepository";
import ModuleMapper from "@/contexts/LearningContext/mappers/ModuleMapper";
import DeleteModuleUseCase from "@/contexts/LearningContext/application/useCases/module/DeleteModuleUseCase";
import { globalEventDispatcher } from "@/eventRegister";
import { CourseMapper } from "@/contexts/LearningContext/mappers/CourseMapper";
import { ICourseRepository } from "@/contexts/LearningContext/domain/interfaces/ICourseRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Module } from "@/contexts/LearningContext/domain/entities/Module";
import { Course } from "@/contexts/LearningContext/domain/aggregates/Course";
import { CourseName } from "@/contexts/LearningContext/domain/valueObjects/CourseName";
import { CourseDescription } from "@/contexts/LearningContext/domain/valueObjects/CourseDescription";
import { UserId } from "@/contexts/CoreContext/domain/valueObjects/UserId";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Modules } from "@/contexts/LearningContext/domain/OneToMany/Modules";

const mockRepository: jest.Mocked<IModuleRepository> = {
  findByCourseId: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findCourseIdByModuleId: jest.fn(),
};

const mockCourseRepository: jest.Mocked<ICourseRepository> = {
  findAll: jest.fn(),
  findById: jest.fn(),
  insert: jest.fn(),
  publish: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockGetAllModulesUseCase: jest.Mocked<IUseCase<string, Module[]>> = {
  execute: jest.fn(),
};

const useCase = new DeleteModuleUseCase(
  mockRepository,
  mockCourseRepository,
  mockGetAllModulesUseCase
);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("DeleteModuleUseCase", () => {
  it("exist", () => {
    expect(useCase).toBeDefined();
  });
  it("Deletes module correctly", async () => {
    const module = ModuleMapper.DtoToDomain({
      id: "asd",
      title: "Test Module",
      lessons: [],
      position: 1,
      quizzes: [],
    });

    mockRepository.findById.mockResolvedValue(module);
    mockRepository.delete.mockResolvedValue();
    await expect(useCase.execute("ModuleTestId")).resolves.toBe(undefined);

    expect(mockRepository.findById).toHaveBeenCalledWith("ModuleTestId");
    expect(mockRepository.delete).toHaveBeenCalledWith("ModuleTestId");
  });

  it("throws error when module not found", async () => {
    mockRepository.findById.mockResolvedValue(null);
    mockRepository.delete.mockResolvedValue();

    await expect(useCase.execute("ModuleTestId")).rejects.toThrow(ApiError);

    expect(mockRepository.findById).toHaveBeenCalledWith("ModuleTestId");
    expect(mockRepository.delete).not.toHaveBeenCalled();
  });
});
