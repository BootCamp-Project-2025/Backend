import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { injectable } from "tsyringe";
import { IStudentTrackProgressRepository } from "../../domain/interfaces/IStudentTrackProgressRepository";
import { StudentTrackProgress } from "../../domain/entities/StudentTrackProgress";
import { StudentTrackProgressDb } from "../../domain/dtos/Dbtypes";
import StudentTrackProgressMapper from "../../mappers/StudentTrackProgressMapper";

@injectable()
export class StudentTrackProgressRepository
  implements IStudentTrackProgressRepository
{
  db = PrismaClient;
  async findById(id: string): Promise<StudentTrackProgress | null> {
    try {
      const trackDb = await this.db.studentTrackProgress.findUnique({
        where: { id },
        include: { videoProgresses: true, resourcesCompleted: true },
      });
      if (!trackDb) return null;
      return StudentTrackProgressMapper.PersistenceToDomain(trackDb);
    } catch (error) {
      console.log(error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Unknown error on database"
      );
    }
  }

  async findByEnrollment(
    enrollmentId: string
  ): Promise<StudentTrackProgress[] | []> {
    try {
      const tracksDb = await this.db.studentTrackProgress.findMany({
        where: { enrollmentId },
        include: { videoProgresses: true, resourcesCompleted: true },
      });
      if (!tracksDb) return [];
      return tracksDb.map(StudentTrackProgressMapper.PersistenceToDomain);
    } catch (error) {
      console.log(error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Unknown error on database"
      );
    }
  }

  async create(trackProgress: StudentTrackProgress): Promise<void> {
    try {
      const trackProgressData: StudentTrackProgressDb =
        StudentTrackProgressMapper.DomainToPersistence(trackProgress);
      await this.db.studentTrackProgress.create({
        data: {
          ...trackProgressData,
          videoProgresses: {
            create: trackProgressData.videoProgresses,
          },
          resourcesCompleted: {
            create: trackProgressData.resourcesCompleted,
          },
        },
      });
    } catch (error) {
      console.log(error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Unknown error on database"
      );
    }
  }

  async update(trackProgress: StudentTrackProgress): Promise<void> {
    try {
      const trackProgressData: StudentTrackProgressDb =
        StudentTrackProgressMapper.DomainToPersistence(trackProgress);
      await this.db.studentTrackProgress.update({
        where: { id: trackProgressData.id },
        data: {
          ...trackProgressData,
          videoProgresses: {
            deleteMany: {},
            create: trackProgressData.videoProgresses,
          },
          resourcesCompleted: {
            deleteMany: {},
            create: trackProgressData.resourcesCompleted,
          },
        },
      });
    } catch (error) {
      console.log(error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Unknown error on database"
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.db.studentTrackProgress.delete({ where: { id } });
    } catch (error) {
      console.log(error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Unknown error on database"
      );
    }
  }
}
