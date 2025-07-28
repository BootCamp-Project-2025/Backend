import { inject, injectable } from "tsyringe";
import IUseCase from "../../domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import {
  IStudentTrackProgressService,
  StudentProgress,
} from "../../domain/interfaces/IStudentTrackProgressService";
import { StudentTrackProgress } from "../../domain/entities/StudentTrackProgress";
import { Lesson } from "../../domain/entities/Lesson";
@injectable()
export default class StudentTrackProgressService
  implements IStudentTrackProgressService {
  constructor(
    @inject("CreateStudentTrackProgressUseCase")
    private readonly createUseCase: IUseCase<
      { trackProgress: StudentTrackProgress; enrollmentId: string },
      void
    >,
    @inject("DeleteStudentTrackProgressUseCase")
    private readonly deleteUseCase: IUseCase<string, void>,
    @inject("UpdateStudentTrackProgressUseCase")
    private readonly updateUseCase: IUseCase<StudentTrackProgress, void>,
    @inject("GetStudentTrackProgressByEnrollmentUseCase")
    private readonly getByEnrollmentUseCase: IUseCase<
      { enrollmentId: string },
      StudentTrackProgress[]
    >,
    @inject("GetStudentTrackProgressByIdUseCase")
    private readonly getByIdUseCase: IUseCase<
      string,
      StudentTrackProgress | null
    >,
    @inject("GetLessonByIdUseCase")
    private readonly getLessonByIdUseCase: IUseCase<string, Lesson>
  ) { }

  async create(
    trackProgress: StudentTrackProgress,
    enrollmentId: string
  ): Promise<void> {
    try {
      await this.createUseCase.execute({ trackProgress, enrollmentId });
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error creating student track progress"
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.deleteUseCase.execute(id);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error deleting student track progress"
      );
    }
  }

  async update(trackProgress: StudentTrackProgress): Promise<void> {
    try {
      const lesson = await this.getLessonByIdUseCase.execute(
        trackProgress.lessonId
      );
      if (!lesson)
        throw new ApiError(StatusCodes.NOT_FOUND, "Lesson not found");

      const totalPdfResources = lesson.props.resources.filter((r) =>
        r.url.endsWith(".pdf")
      ).length;
      trackProgress.setAsCompleted(totalPdfResources);

      await this.updateUseCase.execute(trackProgress);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error updating student track progress"
      );
    }
  }

  async getByEnrollment(enrollmentId: string): Promise<StudentProgress> {
    try {
      const progresses = await this.getByEnrollmentUseCase.execute({
        enrollmentId,
      });
      const completed = progresses.filter((tp) => tp.isCompleted());
      const progress =
        progresses.length === 0 ? 0 : completed.length / progresses.length;

      return {
        progress,
        studentTrackProgresses: progresses,
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error getting student track progresses"
      );
    }
  }

  async getById(id: string): Promise<StudentTrackProgress> {
    try {
      const track = await this.getByIdUseCase.execute(id);
      if (!track) {
        throw new ApiError(
          StatusCodes.NOT_FOUND,
          "Student track progress not found"
        );
      }
      return track;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error getting student track progress by id"
      );
    }
  }
}
