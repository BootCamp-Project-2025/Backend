import { injectable } from "tsyringe";
import IModuleService from "../../domain/interfaces/IModuleService";
import { Module } from "../../domain/entities/Module";

@injectable()
export default class ModuleService implements IModuleService {
  constructor() {}
  create(module: Module): Promise<Module> {
    throw new Error("Method not implemented.");
  }
  delete(moduleId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(module: Module): Promise<Module> {
    throw new Error("Method not implemented.");
  }
  getAll(freelancerId: string): Promise<Module[]> {
    throw new Error("Method not implemented.");
  }
  getById(moduleId: string): Promise<Module> {
    throw new Error("Method not implemented.");
  }
}
