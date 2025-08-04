import "reflect-metadata";

import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import IModuleRepository from "@/contexts/LearningContext/domain/interfaces/IModuleRepository";
import CreateModuleUseCase from "@/contexts/LearningContext/application/useCases/module/CreateModuleUseCase";
import { ICourseRepository } from "@/contexts/LearningContext/domain/interfaces/ICourseRepository";
import ModuleMapper from "@/contexts/LearningContext/mappers/ModuleMapper";
import { globalEventDispatcher } from "@/eventRegister";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Module } from "@/contexts/LearningContext/domain/entities/Module";
import { Course } from "@/contexts/LearningContext/domain/aggregates/Course";
import { CourseName } from "@/contexts/LearningContext/domain/valueObjects/CourseName";
import { CourseDescription } from "@/contexts/LearningContext/domain/valueObjects/CourseDescription";
import { UserId } from "@/contexts/CoreContext/domain/valueObjects/UserId";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Modules } from "@/contexts/LearningContext/domain/OneToMany/Modules";
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

const useCase = new CreateModuleUseCase(
  mockRepository,
  mockCourseRepository,
  mockGetAllModulesUseCase
);

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

  it("Dispatches event after module creation", async () => {
    const module = ModuleMapper.DtoToDomain({
      id: "module-id",
      title: "New Module",
      lessons: [],
      position: 1,
      quizzes: [],
    });

    const course = Course.create({
      name: CourseName.create({ name: "CourseTest" }),
      description: CourseDescription.create({ description: "TestDesc" }),
      imgSrc: "CourseTestImage",
      userId: UserId.create(new UniqueEntityID("userId")),
      modules: Modules.create([]),
    });

    mockCourseRepository.findById.mockResolvedValue(course);
    mockRepository.create.mockResolvedValue(module);
    mockGetAllModulesUseCase.execute.mockResolvedValue([module]);

    jest.spyOn(CourseMapper, "domainToIndex").mockReturnValue({
      id: "CourseTestId",
      name: "CourseTest",
      description: "TestDesc",
      category: "math",
      subCategory: "algebra",
      language: "es",
      field: "STEM",
      time: 123,
      userId: "userId",
      createdAt: new Date(),
      modules: [],
    });

    await useCase.execute({ module, courseId: "CourseTestId" });

    expect(globalEventDispatcher.dispatch).toHaveBeenCalledTimes(1);
    expect(globalEventDispatcher.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          resource: "course",
          resourceDto: expect.objectContaining({
            id: "CourseTestId",
            name: "CourseTest",
          }),
        }),
      })
    );
  });
});
