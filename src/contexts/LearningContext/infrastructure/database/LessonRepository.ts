import { Lesson } from "@/contexts/LearningContext/domain/entities/Lesson";
import ILessonRepository from "@/contexts/LearningContext/domain/interfaces/ILessonRepository";
import { LessonDTO } from "../../domain/dtos/LessonDTO";
import LessonMapper from "../../mappers/LessonMapper";
import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

export default class LessonRepository implements ILessonRepository {
  async create(lesson: Lesson, moduleId: string): Promise<Lesson> {
    try {
      const lessonDto: LessonDTO = LessonMapper.DomainToDto(lesson);
      const lessonDb = await PrismaClient.lesson.create({
        data: {
          ...lessonDto,
          moduleId: moduleId,
          resources: { create: lessonDto.resources },
        },
        include: { resources: true },
      });
      return LessonMapper.DtoToDomain(lessonDb);
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
  async delete(lessonId: string): Promise<void> {
    try {
      await PrismaClient.lesson.delete({
        where: { id: lessonId },
      });
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
  async update(lesson: Lesson): Promise<Lesson> {
    try {
      const lessonDto: LessonDTO = LessonMapper.DomainToDto(lesson);
      const lessonDb = await PrismaClient.lesson.update({
        data: {
          ...lessonDto,
          resources: { create: lessonDto.resources },
        },
        include: { resources: true },
        where: { id: lessonDto.id },
      });
      return LessonMapper.DtoToDomain(lessonDb);
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
