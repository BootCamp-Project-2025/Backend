import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { ModuleDTO } from "../../domain/dtos/ModuleDTO";
import IModuleRepository from "../../domain/interfaces/IModuleRepository";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { injectable } from "tsyringe";
import ModuleMapper from "../../mappers/ModuleMapper";
import { Module } from "../../domain/entities/Module";

@injectable()
export class ModuleRepository implements IModuleRepository {
  async findByCourseId(courseId: string): Promise<Module[]> {
    try {
      const moduleDb = await PrismaClient.module.findMany({
        where: { courseId: courseId },
        include: { lessons: { include: { resources: true } } },
      });
      return ModuleMapper.bulkDtoToDomain(moduleDb);
    } catch (error) {
      console.log(error);
      if (error instanceof Error)
        throw new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.message.split("Argument")[1] ?? error.message
        );
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "unkown error");
    }
  }

  async create(module: Module, courseId: string): Promise<Module> {
    try {
      const moduleDto: ModuleDTO = ModuleMapper.DomainToDto(module);
      console.log(moduleDto.title);
      const moduleDb = await PrismaClient.module.create({
        data: {
          id: moduleDto.id,
          title: moduleDto.title,
          position: moduleDto.position,
          courseId: courseId,
        },
      });
      return ModuleMapper.DtoToDomain(moduleDb);
    } catch (error) {
      console.log(error);
      if (error instanceof Error)
        throw new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.message.split("Argument")[1] ?? error.message
        );
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "unkown error");
    }
  }

  async delete(moduleId: string): Promise<void> {
    try {
      await PrismaClient.module.delete({ where: { id: moduleId } });
    } catch (error) {
      console.log(error);
      if (error instanceof Error)
        throw new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.message.split("Argument")[1] ?? error.message
        );
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "unkown error");
    }
  }

  async update(module: Module): Promise<Module> {
    try {
      const moduleDto: ModuleDTO = ModuleMapper.DomainToDto(module);
      const moduleDb = await PrismaClient.module.update({
        where: { id: moduleDto.id },
        data: {
          title: moduleDto.title,
          position: moduleDto.position,
        },
      });
      return ModuleMapper.DtoToDomain(moduleDb);
    } catch (error) {
      console.log(error);
      if (error instanceof Error)
        throw new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.message.split("Argument")[1] ?? error.message
        );
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "unkown error");
    }
  }
}
