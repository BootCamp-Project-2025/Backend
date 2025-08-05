import { Enrollment } from "@/contexts/CoreContext/domain/aggregates/Enrollment";
import { IEnrollmentRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IEnrollmentRepository";
import { IUserRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IUserRepository";
import { ICourseRepository } from "@/contexts/LearningContext/domain/interfaces/ICourseRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export class CheckEnrollmentUseCase
  implements IUseCase<{ userId: string; courseId: string }, Enrollment | null>
{
  constructor(
    @inject("IEnrollmentRepository")
    private enrollmentRepository: IEnrollmentRepository,
    @inject("ICourseRepository")
    private courseRepository: ICourseRepository,
    @inject("IUserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ userId, courseId }: { userId: string; courseId: string }) {
    const user = await this.userRepository.getById(userId);
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }
    const course = await this.courseRepository.findById(courseId);

    if (!course) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Course not found");
    }

    const enrollment = await this.enrollmentRepository.findValidEnrollment(
      userId,
      courseId
    );
    if (!enrollment) return null;

    return enrollment;
  }
}
