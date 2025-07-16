import "reflect-metadata";

import IModuleRepository from "@/contexts/LearningContext/domain/interfaces/IModuleRepository";
import ModuleMapper from "@/contexts/LearningContext/mappers/ModuleMapper";
import GetAllModulesUseCase from "@/contexts/LearningContext/application/useCases/module/GetAllModulesUseCase";

const mockRepository: jest.Mocked<IModuleRepository> = {
  findByCourseId: jest.fn(),
} as any;

const useCase = new GetAllModulesUseCase(mockRepository);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GetAllModulesUseCase", () => {
  it("exist", () => {
    expect(useCase).toBeDefined;
  });
  it("Get all modules of a course correctly", async () => {
    const module = ModuleMapper.DtoToDomain({
      id: "asd",
      title: "Test Module",
      lessons: [],
      position: 1,
      quizzes: [],
    });

    const module1 = ModuleMapper.DtoToDomain({
      id: "asd",
      title: "Test Module",
      lessons: [],
      position: 2,
      quizzes: [],
    });

    const modules = [module, module1];

    mockRepository.findByCourseId.mockResolvedValue(modules);
    expect(await useCase.execute("modules")).resolves;
    expect(mockRepository.findByCourseId).toHaveBeenCalledWith("modules");
  });
});
