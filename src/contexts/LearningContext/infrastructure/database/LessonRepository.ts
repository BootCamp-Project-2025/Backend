import { Lesson } from "@/contexts/LearningContext/domain/entities/Lesson";
import ILessonRepository from "@/contexts/LearningContext/domain/interfaces/ILessonRepository";
import { LessonDTO } from "../../domain/dtos/LessonDTO";
import LessonMapper from "../../mappers/LessonMapper";
import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { LessonDb } from "../../domain/dtos/Dbtypes";
import { StudentTrackProgressDb } from "../../domain/dtos/Dbtypes";

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

      await this.syncStudentTrackProgress(lessonDb);

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

  private async syncStudentTrackProgress(updatedLesson: LessonDb): Promise<void> {
    const trackProgressList = await this.db.studentTrackProgress.findMany({
      where: { lessonId: updatedLesson.id.toString() },
      include: {
        videoProgresses: true,
        resourcesCompleted: true
      }
    });

    if (trackProgressList.length === 0) return;
    for (const trackProgress of trackProgressList) {
      await this.updateTrackProgressStructure(trackProgress, updatedLesson);
    }
  }

  private async updateTrackProgressStructure(
    trackProgress: StudentTrackProgressDb,
    updatedLesson: LessonDb
  ): Promise<void> {

    const existingVideoProgresses = trackProgress.videoProgresses || [];
    const newVideoProgresses = updatedLesson.videoUrls?.map((videoUrl: any) => {
      const existing = existingVideoProgresses.find(
        (vp: any) => vp.url === videoUrl.url
      );

      return {
        url: videoUrl.url,
        watchedSeconds: existing?.watchedSeconds || 0,
        completed: existing?.completed || false,
      };
    }) || [];

    const existingResourcesCompleted = trackProgress.resourcesCompleted || [];
    const newResourcesCompleted = existingResourcesCompleted.filter(
      (rc: any) => updatedLesson.resources.some((r: any) => r.id === rc.resourceId)
    );

    await this.db.studentTrackProgress.update({
      where: { id: trackProgress.id },
      data: {
        videoProgresses: {
          deleteMany: {},
          create: newVideoProgresses,
        },
        resourcesCompleted: {
          deleteMany: {},
          create: newResourcesCompleted,
        },
        completed: false,
      },
    });
  }
}
