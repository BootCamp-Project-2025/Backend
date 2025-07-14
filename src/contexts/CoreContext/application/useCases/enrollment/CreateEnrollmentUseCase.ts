import { Enrollment } from "@/contexts/CoreContext/domain/aggregates/Enrollment";
import { IEnrollmentRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IEnrollmentRepository";
import { IUserRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IUserRepository";
import { ICourseRepository } from "@/contexts/LearningContext/domain/interfaces/ICourseRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

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
    private userRepository: IUserRepository
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

    const isEnrolled = await this.enrollmentRepository.isUserEnrolled(
      enrollment.userId.toString(),
      enrollment.courseId.toString()
    );
    if (isEnrolled) {
      throw new ApiError(
        StatusCodes.CONFLICT,
        "User is already enrolled in this course"
      );
    }
    console.log("Course found:", enrollment.courseId, course);
    if (!course) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Course not found");
    }

    return await this.enrollmentRepository.create(enrollment);
  }
}
