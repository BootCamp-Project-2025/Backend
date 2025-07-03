import { inject, injectable } from "tsyringe";
import IModuleService from "../../domain/interfaces/IModuleService";
import { Module } from "../../domain/entities/Module";
import IUseCase from "../../domain/interfaces/IUseCase";

@injectable()
export default class ModuleService implements IModuleService {
  constructor(
    @inject("CreateModuleUseCase")
    private readonly createModuleUseCase: IUseCase<Module, Module>,
    @inject("DeleteModuleUseCase")
    private readonly deleteModuleUseCase: IUseCase<string, void>,
    @inject("UpdateModuleUseCase")
    private readonly updateModuleUseCase: IUseCase<Module, Module>,
    @inject("GetAllModulesUseCase")
    private readonly getAllModulesUseCase: IUseCase<string, Module[]>
  ) {}
  async create(module: Module): Promise<Module> {
    return await this.createModuleUseCase.execute(module);
  }
  async delete(moduleId: string): Promise<void> {
    await this.deleteModuleUseCase.execute(moduleId);
  }
  async update(module: Module): Promise<Module> {
    return await this.updateModuleUseCase.execute(module);
  }
  async getAll(courseId: string): Promise<Module[]> {
    return await this.getAllModulesUseCase.execute(courseId);
  }
}
