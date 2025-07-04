import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { ModuleDTO } from "../../domain/dtos/ModuleDTO";
import IModuleRepository from "../../domain/interfaces/IModuleRepository";

export class ModuleRepository implements IModuleRepository {
  async findByCourseId(courseId: string): Promise<ModuleDTO[]> {
    return PrismaClient.module.findMany({
      where: { CourseId: courseId },
      include: { lessons: true },
    });
  }

  async create(module: ModuleDTO): Promise<ModuleDTO> {
    this.modules.push(module);
    return module;
  }

  async delete(moduleId: string): Promise<void> {
    this.modules = this.modules.filter((module) => module.id !== moduleId);
  }

  async update(module: ModuleDTO): Promise<ModuleDTO> {
    const index = this.modules.findIndex((m) => m.id === module.id);
    if (index !== -1) {
      this.modules[index] = module;
      return module;
    }
    throw new Error("Module not found");
  }
}
