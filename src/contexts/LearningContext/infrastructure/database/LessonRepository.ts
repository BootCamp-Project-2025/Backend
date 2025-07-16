import { Lesson } from "@/contexts/LearningContext/domain/entities/Lesson";
import ILessonRepository from "@/contexts/LearningContext/domain/interfaces/ILessonRepository";
import { LessonDTO } from "../../domain/dtos/LessonDTO";
import LessonMapper from "../../mappers/LessonMapper";
import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

export default class LessonRepository implements ILessonRepository {
  db = PrismaClient;
  async findById(lessonId: string): Promise<Lesson | null> {
    try {
      const lessonDb = await this.db.lesson.findUnique({
        where: { id: lessonId },
        include: { resources: true },
      });
      if (!lessonDb) return null;
      return LessonMapper.PersistanceToDomain(lessonDb);
    } catch (error) {
      console.log(error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "unkown error on database"
      );
    }
  }
  async create(lesson: Lesson, moduleId: string): Promise<Lesson> {
    try {
      const lessonDto: LessonDTO = LessonMapper.DomainToDto(lesson);
      const lessonDb = await this.db.lesson.create({
        data: {
          ...lessonDto,
          moduleId,
          resources: { create: lessonDto.resources },
        },
        include: { resources: true },
      });
      return LessonMapper.PersistanceToDomain(lessonDb);
    } catch (error) {
      console.log(error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "unkown error on database"
      );
    }
  }
  async delete(lessonId: string): Promise<void> {
    try {
      await this.db.lesson.delete({
        where: { id: lessonId },
      });
    } catch (error) {
      console.log(error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "unkown error on database"
      );
    }
  }
  async update(lesson: Lesson): Promise<Lesson> {
    try {
      const lessonDto: LessonDTO = LessonMapper.DomainToDto(lesson);
      const lessonDb = await this.db.lesson.update({
        data: {
          ...lessonDto,
          resources: {
            deleteMany: {},
            create: lessonDto.resources,
          },
        },
        include: { resources: true },
        where: { id: lessonDto.id },
      });
      return LessonMapper.PersistanceToDomain(lessonDb);
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
