import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import IModuleRepository from "../../domain/interfaces/IModuleRepository";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { injectable } from "tsyringe";
import ModuleMapper from "../../mappers/ModuleMapper";
import { Module } from "../../domain/entities/Module";
import { ModuleDb } from "../../domain/dtos/Dbtypes";

@injectable()
export class ModuleRepository implements IModuleRepository {
  async findByCourseId(courseId: string): Promise<Module[]> {
    try {
      const moduleDb = await PrismaClient.module.findMany({
        where: { courseId: courseId },
        include: { lessons: { include: { resources: true } } },
        orderBy: { position: "asc" },
      });
      return ModuleMapper.bulkPersistanceToDomain(moduleDb);
    } catch (error) {
      console.log(error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "unkown error on database"
      );
    }
  }

  async findById(moduleId: string): Promise<Module | null> {
    try {
      const moduleDb = await PrismaClient.module.findUnique({
        where: { id: moduleId },
        include: { lessons: { include: { resources: true } } },
      });
      if (moduleDb === null) return null;
      return ModuleMapper.PersistanceToDomain(moduleDb);
    } catch (error) {
      console.log(error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "unkown error on database"
      );
    }
  }

  async create(module: Module, courseId: string): Promise<Module> {
    try {
      const moduleDto: ModuleDb = ModuleMapper.DomainToPersistance(
        module,
        courseId
      );
      const moduleDb = await PrismaClient.module.create({
        data: {
          id: moduleDto.id,
          title: moduleDto.title,
          position: moduleDto.position,
          courseId: courseId,
          lessons: {
            create: moduleDto.lessons.map((lesson) => ({
              id: lesson.id,
              videoUrls: lesson.videoUrls,
              description: lesson.description,
              title: lesson.title,
              position: lesson.position,
              resources: {
                create: lesson.resources.map((resource) => ({
                  name: resource.name,
                  url: resource.url,
                })),
              },
            })),
          },
        },
        include: { lessons: { include: { resources: true } } },
      });
      return ModuleMapper.PersistanceToDomain(moduleDb);
    } catch (error) {
      console.log(error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "unkown error on database"
      );
    }
  }

  async delete(moduleId: string): Promise<void> {
    try {
      await PrismaClient.module.delete({ where: { id: moduleId } });
    } catch (error) {
      console.log(error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "unkown error on database"
      );
    }
  }

  async update(module: Module): Promise<Module> {
    try {
      const moduleDto = ModuleMapper.DomainToDto(module);
      const moduleDb = await PrismaClient.module.update({
        where: { id: moduleDto.id },
        data: {
          title: moduleDto.title,
          position: moduleDto.position,
        },
        include: { lessons: { include: { resources: true } } },
      });
      return ModuleMapper.PersistanceToDomain(moduleDb);
    } catch (error) {
      console.log(error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "unkown error on database"
      );
    }
  }
}
