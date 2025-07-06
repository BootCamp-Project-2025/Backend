import { Module } from "../entities/Module";

export default interface IModuleRepository {
  findByCourseId(courseId: string): Promise<Module[]>;
  create(module: Module, courseId: string): Promise<Module>;
  delete(moduleId: string): Promise<void>;
  update(module: Module): Promise<Module>;
}
