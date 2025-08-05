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

jest.mock("@/eventRegister", () => ({
  globalEventDispatcher: {
    dispatch: jest.fn(),
  },
}));

jest.mock("@/contexts/LearningContext/mappers/CourseMapper", () => ({
  CourseMapper: {
    domainToIndex: jest.fn(),
  },
}));

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

    const course = Course.create({
      name: CourseName.create({ name: "Test Course" }),
      description: CourseDescription.create({ description: "desc" }),
      imgSrc: "img",
      userId: UserId.create(new UniqueEntityID("user-id")),
      modules: Modules.create([]),
      published: false,
    });

    const courseId = "course-id";

    mockRepository.findById.mockResolvedValue(module);
    mockRepository.findCourseIdByModuleId.mockResolvedValue(courseId);
    mockRepository.delete.mockResolvedValue();
    mockCourseRepository.findById.mockResolvedValue(course);
    mockGetAllModulesUseCase.execute.mockResolvedValue([module]);
    (CourseMapper.domainToIndex as jest.Mock).mockReturnValue({
      id: courseId,
      name: "Test Course",
    });
    await expect(useCase.execute("ModuleTestId")).resolves.toBe(undefined);

    expect(globalEventDispatcher.dispatch).toHaveBeenCalledTimes(1);
    expect(globalEventDispatcher.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          resource: "course",
          resourceDto: expect.objectContaining({
            id: courseId,
            name: "Test Course",
          }),
        }),
      })
    );
  });

  it("Module not found", () => {
    mockRepository.findById.mockResolvedValue(null);
    mockRepository.delete.mockResolvedValue();
    expect(async () => await useCase.execute("ModuleTestId")).rejects.toThrow(
      ApiError
    );
  });
});
