import { Module } from "../entities/Module";

export default interface IModuleService {
  create(module: Module): Promise<Module>;
  delete(moduleId: string): Promise<void>;
  update(module: Module): Promise<Module>;
  getAll(courseId: string): Promise<Module[]>;
}
