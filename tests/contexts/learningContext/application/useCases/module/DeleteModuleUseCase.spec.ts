import "reflect-metadata";

import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import IModuleRepository from "@/contexts/LearningContext/domain/interfaces/IModuleRepository";
import ModuleMapper from "@/contexts/LearningContext/mappers/ModuleMapper";
import DeleteModuleUseCase from "@/contexts/LearningContext/application/useCases/module/DeleteModuleUseCase";

const mockRepository: jest.Mocked<IModuleRepository> = {
  delete: jest.fn(),
  findById: jest.fn(),
} as any;

const useCase = new DeleteModuleUseCase(mockRepository);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("DeleteModuleUseCase", () => {
  it("exist", () => {
    expect(useCase).toBeDefined;
  });
  it("Deletes module correctly", () => {
    const module = ModuleMapper.DtoToDomain({
      id: "asd",
      title: "Test Module",
      lessons: [],
      position: 1,
    });

    mockRepository.findById.mockResolvedValue(module);
    mockRepository.delete.mockResolvedValue();
    expect(async () => await useCase.execute("ModuleTestId")).resolves;
  });

  it("Module not found", () => {
    mockRepository.findById.mockResolvedValue(null);
    mockRepository.delete.mockResolvedValue();
    expect(async () => await useCase.execute("ModuleTestId")).rejects.toThrow(
      ApiError
    );
  });
});
