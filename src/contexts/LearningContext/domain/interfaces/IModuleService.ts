import { Module } from "../entities/Module";

export default interface IModuleService {
  create(module: Module): Promise<Module>;
  delete(moduleId: string): Promise<void>;
  update(module: Module): Promise<Module>;
  getAll(freelancerId: string): Promise<Module[]>;
  getById(moduleId: string): Promise<Module>;
}
