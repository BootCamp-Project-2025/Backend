import "reflect-metadata";

import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import IModuleRepository from "@/contexts/LearningContext/domain/interfaces/IModuleRepository";
import ModuleMapper from "@/contexts/LearningContext/mappers/ModuleMapper";
import UpdateModuleUseCase from "@/contexts/LearningContext/application/useCases/module/UpdateModuleUseCase";

const mockRepository: jest.Mocked<IModuleRepository> = {
  update: jest.fn(),
  findById: jest.fn(),
  findByCourseId: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};

const useCase = new UpdateModuleUseCase(mockRepository);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("UpdateModuleUseCase", () => {
  it("exist", () => {
    expect(useCase).toBeDefined;
  });
  it("Updates module correctly", () => {
    const module = ModuleMapper.DtoToDomain({
      id: "asd",
      title: "Test Module",
      lessons: [],
      position: 1,
      quizzes: [],
    });

    const moduleNew = ModuleMapper.DtoToDomain({
      id: "asd",
      title: "Test Module",
      lessons: [],
      position: 1,
      quizzes: [],
    });

    mockRepository.findById.mockResolvedValue(module);
    mockRepository.update.mockResolvedValue(moduleNew);
    expect(async () => await useCase.execute(moduleNew)).resolves;
  });

  it("Module not found", () => {
    const moduleNew = ModuleMapper.DtoToDomain({
      id: "asd",
      title: "Test Module",
      lessons: [],
      position: 1,
      quizzes: [],
    });
    mockRepository.findById.mockResolvedValue(null);
    mockRepository.update.mockResolvedValue(moduleNew);
    expect(async () => await useCase.execute(moduleNew)).rejects.toThrow(
      ApiError
    );
  });
});
