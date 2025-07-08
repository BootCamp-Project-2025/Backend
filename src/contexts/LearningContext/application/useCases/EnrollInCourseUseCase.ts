import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";
import { ICourseRepository } from "../../domain/interfaces/ICourseRepository";
import { IUserRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IUserRepository";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
@injectable()
export class EnrollInCourseUseCase
  implements IUseCase<{ courseId: string; userId: string }, void>
{
  constructor(
    @inject("ICourseRepository")
    private readonly courseRepository: ICourseRepository,
    @inject("IUserRepository")
    private readonly userRepository: IUserRepository
  ) {}

  async execute(params: { courseId: string; userId: string }): Promise<void> {
    const { courseId, userId } = params;

    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Course not found");
    }
    const user = await this.userRepository.getById(userId);
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }
    const isEnrolled = await this.courseRepository.isUserEnrolled(
      courseId,
      userId
    );

    if (isEnrolled) {
      throw new ApiError(StatusCodes.CONFLICT, "User is already enrolled");
    }

    await this.courseRepository.enrollInCourse(course, user);
  }
}
