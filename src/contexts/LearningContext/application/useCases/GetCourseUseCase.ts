import { ICourseRepository } from "../../domain/interfaces/ICourseRepository";
import { Course } from "../../domain/aggregates/Course";
import IUseCase from "../../domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

@injectable()
export class GetCourseUseCase implements IUseCase<string, Course> {
  constructor(
    @inject("ICourseRepository") private courseRepository: ICourseRepository
  ) {}

  async execute(id: string): Promise<Course> {
    try {
      const course = await this.courseRepository.findById(id);
      if (course === null)
        throw new ApiError(StatusCodes.NOT_FOUND, "course not found");
      return course;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.log(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "error in GetCourseUseCase"
      );
    }
  }
}
