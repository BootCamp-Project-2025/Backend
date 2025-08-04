import { Enrollment } from "@/contexts/CoreContext/domain/aggregates/Enrollment";
import { IEnrollmentRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IEnrollmentRepository";
import { IUserRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IUserRepository";
import { ICourseRepository } from "@/contexts/LearningContext/domain/interfaces/ICourseRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";
import { VideoProgress } from "@/contexts/LearningContext/domain/valueObjects/VideoProgress";
import { StudentTrackProgress } from "@/contexts/LearningContext/domain/entities/StudentTrackProgress";
import { EnrollmentId } from "@/contexts/CoreContext/domain/valueObjects/EnrollmentId";
import { Module } from "@/contexts/LearningContext/domain/entities/Module";

@injectable()
export class CreateEnrollmentUseCase
  implements IUseCase<Enrollment, Enrollment>
{
  constructor(
    @inject("IEnrollmentRepository")
    private enrollmentRepository: IEnrollmentRepository,
    @inject("ICourseRepository")
    private courseRepository: ICourseRepository,
    @inject("IUserRepository")
    private userRepository: IUserRepository,
    @inject("GetAllModulesUseCase")
    private GetAllModulesUseCase: IUseCase<string, Module[]>,
    @inject("CreateStudentTrackProgressUseCase")
    private createStudentTrackProgressUseCase: IUseCase<
      { trackProgress: StudentTrackProgress; enrollmentId: string },
      void
    >
  ) {}

  async execute(enrollment: Enrollment): Promise<Enrollment> {
    const user = await this.userRepository.getById(
      enrollment.userId.toString()
    );
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }
    const course = await this.courseRepository.findById(
      enrollment.courseId.toString()
    );

    if (!course) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Course not found");
    }

    const existingEnrollment =
      await this.enrollmentRepository.findValidEnrollment(
        enrollment.userId.toString(),
        enrollment.courseId.toString()
      );

    if (existingEnrollment) {
      if (existingEnrollment.status === "CANCELED") {
        return await this.enrollmentRepository.reactivateEnrollment(
          existingEnrollment.id.toString()
        );
      } else {
        throw new ApiError(
          StatusCodes.CONFLICT,
          "User is already enrolled in this course"
        );
      }
    }
    const createdEnrollment =
      await this.enrollmentRepository.create(enrollment);

    const modules = await this.GetAllModulesUseCase.execute(
      createdEnrollment.courseId.toString()
    );

    for (const module of modules) {
      const lessons = module.props.lessons.getItems();
      for (const lesson of lessons) {
        const trackProgress = StudentTrackProgress.create({
          enrollmentId: EnrollmentId.create(createdEnrollment.id),
          lessonId: lesson.id.toString(),
          videoProgresses: lesson.props.videoUrls.map((videoUrl) =>
            VideoProgress.create({
              url: videoUrl.value,
              watchedSeconds: 0,
              completed: false,
            })
          ),
          resourcesCompleted: [],
          completed: false,
        });
        await this.createStudentTrackProgressUseCase.execute({
          trackProgress,
          enrollmentId: createdEnrollment.id.toString(),
        });
      }
    }
    return createdEnrollment;
  }
}
