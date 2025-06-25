import { ICourseRepository } from "../../domain/interfaces/ICourseRepository";
import { Course } from "../../domain/aggregates/Course";
import IUseCase from "../../domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

@injectable()
export class EditCourseUseCase implements IUseCase<Course, Course> {
  constructor(
    @inject("ICourseRepository") private courseRepository: ICourseRepository
  ) {}

  async execute(course: Course): Promise<Course> {
    try {
      if ((await this.courseRepository.findById(course.id.toString())) === null)
        throw new ApiError(StatusCodes.NOT_FOUND, "this course doesnt exist");
      return await this.courseRepository.update(course);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.log(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "error in EditCourseUseCase"
      );
    }
  }
}
