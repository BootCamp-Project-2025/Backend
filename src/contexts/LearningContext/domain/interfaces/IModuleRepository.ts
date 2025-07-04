import { ModuleDTO } from "../dtos/ModuleDTO";

export default interface IModuleRepository {
  findByCourseId(courseId: string): Promise<ModuleDTO[]>;
  create(module: ModuleDTO): Promise<ModuleDTO>;
  delete(moduleId: string): Promise<void>;
  update(module: ModuleDTO): Promise<ModuleDTO>;
}
