import "reflect-metadata";
import ModuleService from "@/contexts/LearningContext/application/services/ModuleService";
import ModuleMapper from "@/contexts/LearningContext/mappers/ModuleMapper";

const createModuleUseCase = {
  execute: jest.fn(),
};
const deleteModuleUseCase = {
  execute: jest.fn(),
};
const updateModuleUseCase = {
  execute: jest.fn(),
};
const getAllModulesUseCase = {
  execute: jest.fn(),
};

describe("ModuleService", () => {
  const moduleService = new ModuleService(
    createModuleUseCase,
    deleteModuleUseCase,
    updateModuleUseCase,
    getAllModulesUseCase
  );

  it("should create a module", async () => {
    const module = ModuleMapper.DtoToDomain({
      id: "1",
      name: "Test Module",
      lessons: [],
    });
    createModuleUseCase.execute.mockResolvedValue(module);
    const result = await moduleService.create(module);
    expect(createModuleUseCase.execute).toHaveBeenCalledWith(module);
    expect(result).toEqual(module);
  });

  it("should delete a module", async () => {
    await moduleService.delete("moduleId");
    expect(deleteModuleUseCase.execute).toHaveBeenCalledWith("moduleId");
  });

  it("should update a module", async () => {
    const module = ModuleMapper.DtoToDomain({
      id: "1",
      name: "Test Module",
      lessons: [],
    });
    updateModuleUseCase.execute.mockResolvedValue(module);
    const result = await moduleService.update(module);
    expect(updateModuleUseCase.execute).toHaveBeenCalledWith(module);
    expect(result).toEqual(module);
  });

  it("should get a list of modules", async () => {
    const module = ModuleMapper.bulkDtoToDomain([
      {
        id: "1",
        name: "Test Module",
        lessons: [],
      },
      {
        id: "2",
        name: "Test Modul2",
        lessons: [],
      },
    ]);
    getAllModulesUseCase.execute.mockResolvedValue(module);
    const result = await moduleService.getAll("courseId");
    expect(getAllModulesUseCase.execute).toHaveBeenCalledWith("courseId");
    expect(result).toEqual(module);
  });
});
