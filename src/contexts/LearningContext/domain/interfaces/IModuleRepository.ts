import { Module } from "../entities/Module";

export default interface IModuleRepository {
  findByCourseId(courseId: string): Promise<Module[]>;
  findById(moduleId: string): Promise<Module | null>;
  create(module: Module, courseId: string): Promise<Module>;
  delete(moduleId: string): Promise<void>;
  update(module: Module): Promise<Module>;
  findCourseIdByModuleId(moduleId: string): Promise<string>;
}
