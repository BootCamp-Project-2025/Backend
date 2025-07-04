import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { ModuleDTO } from "../../domain/dtos/ModuleDTO";
import IModuleRepository from "../../domain/interfaces/IModuleRepository";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { injectable } from "tsyringe";

@injectable()
export class ModuleRepository implements IModuleRepository {
  async findByCourseId(courseId: string): Promise<ModuleDTO[]> {
    try {
      return PrismaClient.module.findMany({
        where: { courseId: courseId },
        include: { lessons: { include: { resources: true } } },
      });
    } catch {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "error geting the modules from the database"
      );
    }
  }

  async create(module: Required<ModuleDTO>): Promise<ModuleDTO> {
    try {
      await PrismaClient.module.create({
        data: {
          id: module.id,
          name: module.name,
          position: module.position,
          courseId: module.courseId,
        },
      });
    } catch (error) {
      console.log(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error saving the module on the database"
      );
    }
    return module;
  }

  async delete(moduleId: string): Promise<void> {
    try {
      await PrismaClient.module.delete({ where: { id: moduleId } });
    } catch {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error deleting the module on the database"
      );
    }
  }

  async update(module: Required<ModuleDTO>): Promise<ModuleDTO> {
    try {
      return PrismaClient.module.update({
        where: { id: module.id },
        data: {
          id: module.id,
          name: module.name,
          position: module.position,
          courseId: module.courseId,
        },
      });
    } catch {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error updating the module on the database"
      );
    }
  }
}
