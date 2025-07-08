import "reflect-metadata";

import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import IModuleRepository from "@/contexts/LearningContext/domain/interfaces/IModuleRepository";
import CreateModuleUseCase from "@/contexts/LearningContext/application/useCases/module/CreateModuleUseCase";
import { ICourseRepository } from "@/contexts/LearningContext/domain/interfaces/ICourseRepository";
import ModuleMapper from "@/contexts/LearningContext/mappers/ModuleMapper";
import { CourseMapper } from "@/contexts/LearningContext/mappers/CourseMapper";

const mockRepository: jest.Mocked<IModuleRepository> = {
  create: jest.fn(),
} as any;

const mockCourseRepository: jest.Mocked<ICourseRepository> = {
  findById: jest.fn(),
} as any;

const useCase = new CreateModuleUseCase(mockRepository, mockCourseRepository);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("CreateModuleUseCase", () => {
  it("exist", () => {
    expect(useCase).toBeDefined;
  });
  it("Create module correctly", () => {
    const module = ModuleMapper.DtoToDomain({
      id: "asd",
      title: "Test Module",
      lessons: [],
      position: 1,
    });
    const course = CourseMapper.toDomain({
      name: "CourseTest",
      id: "CourseTestId",
      field: "CourseTestField",
      requirements: "CourseTestRequirements",
      time: 0,
      description: "CourseTestDescription",
      imgSrc: "CourseTestImage",
    });
    mockCourseRepository.findById.mockResolvedValue(course);
    mockRepository.create.mockResolvedValue(module);
    expect(
      async () =>
        await useCase.execute({ module: module, courseId: "CourseTestId" })
    ).resolves;
  });

  it("Course not found", () => {
    const module = ModuleMapper.DtoToDomain({
      id: "asd",
      title: "Test Module",
      lessons: [],
      position: 1,
    });
    mockCourseRepository.findById.mockResolvedValue(null);
    mockRepository.create.mockResolvedValue(module);
    expect(
      async () =>
        await useCase.execute({ module: module, courseId: "CourseTestId" })
    ).rejects.toThrow(ApiError);
  });
});
