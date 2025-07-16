import "reflect-metadata";

import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import IModuleRepository from "@/contexts/LearningContext/domain/interfaces/IModuleRepository";
import ModuleMapper from "@/contexts/LearningContext/mappers/ModuleMapper";
import DeleteModuleUseCase from "@/contexts/LearningContext/application/useCases/module/DeleteModuleUseCase";

const mockRepository: jest.Mocked<IModuleRepository> = {
  findByCourseId: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

const useCase = new DeleteModuleUseCase(mockRepository);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("DeleteModuleUseCase", () => {
  it("exist", () => {
    expect(useCase).toBeDefined();
  });
  it("Deletes module correctly", () => {
    const module = ModuleMapper.DtoToDomain({
      id: "asd",
      title: "Test Module",
      lessons: [],
      position: 1,
      quizzes: [],
    });

    mockRepository.findById.mockResolvedValue(module);
    mockRepository.delete.mockResolvedValue();
    expect(useCase.execute("ModuleTestId")).resolves.toBe(undefined);
  });

  it("Module not found", () => {
    mockRepository.findById.mockResolvedValue(null);
    mockRepository.delete.mockResolvedValue();
    expect(async () => await useCase.execute("ModuleTestId")).rejects.toThrow(
      ApiError
    );
  });
});
