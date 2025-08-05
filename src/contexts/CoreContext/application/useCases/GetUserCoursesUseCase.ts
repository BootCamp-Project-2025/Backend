import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import { Course } from "@/contexts/LearningContext/domain/aggregates/Course";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";

@injectable()
export class GetUserCoursesUseCase {
  constructor(
    @inject("IUserRepository")
    private readonly repository: IUserRepository
  ) {}

  async execute(userId: string): Promise<Course[]> {
    const user = await this.repository.getById(userId);
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, "User not found.");
    }
    return await this.repository.getCourses(userId);
  }
}
