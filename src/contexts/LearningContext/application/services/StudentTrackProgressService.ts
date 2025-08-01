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
import { Enrollment } from "@/contexts/CoreContext/domain/aggregates/Enrollment";
import { Module } from "../../domain/entities/Module";
import { Course } from "../../domain/aggregates/Course";
@injectable()
export default class StudentTrackProgressService
  implements IStudentTrackProgressService
{
  constructor(
    @inject("CreateStudentTrackProgressUseCase")
    private readonly createUseCase: IUseCase<
      { trackProgress: StudentTrackProgress; enrollmentId: string },
      void
    >,
    @inject("UpdateStudentTrackProgressUseCase")
    private readonly updateUseCase: IUseCase<StudentTrackProgress, void>,
    @inject("GetStudentTrackProgressByEnrollmentUseCase")
    private readonly getByEnrollmentUseCase: IUseCase<
      { enrollmentId: string },
      StudentTrackProgress[]
    >,
    @inject("GetStudentTrackProgressByIdUseCase")
    private readonly findP2PCourseByIdUseCase: IUseCase<
      string,
      StudentTrackProgress | null
    >,
    @inject("GetLessonByIdUseCase")
    private readonly getLessonByIdUseCase: IUseCase<string, Lesson>,
    @inject("GetEnrollmentByIdUseCase")
    private readonly getEnrollmentByIdUseCase: IUseCase<string, Enrollment>,
    @inject("GetAllModulesUseCase")
    private getAllModulesUseCase: IUseCase<string, Module[]>,
    @inject("GetCourseUseCase")
    private readonly GetCourseUseCase: IUseCase<string, Course>
  ) {}

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
        progresses.length === 0
          ? 0
          : parseFloat((completed.length / progresses.length).toFixed(2));

      const enrollment =
        await this.getEnrollmentByIdUseCase.execute(enrollmentId);

      const modules = await this.getAllModulesUseCase.execute(
        enrollment.props.courseId.toString()
      );

      const course = await this.GetCourseUseCase.execute(
        enrollment.props.courseId.toString()
      );

      return {
        progress,
        courseName: course.getName().value,
        modules,
        courseId: enrollment.props.courseId.toString(),
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
      const track = await this.findP2PCourseByIdUseCase.execute(id);
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
