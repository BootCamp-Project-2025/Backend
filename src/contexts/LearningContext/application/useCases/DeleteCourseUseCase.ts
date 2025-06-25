import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { ICourseRepository } from "../../domain/interfaces/ICourseRepository";
import IUseCase from "../../domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";
import { StatusCodes } from "http-status-codes";

@injectable()
export class DeleteCourseUseCase implements IUseCase<string, void> {
  constructor(
    @inject("ICourseRepository") private courseRepository: ICourseRepository
  ) {}

  async execute(courseId: string): Promise<void> {
    try {
      if ((await this.courseRepository.findById(courseId)) === null)
        throw new ApiError(StatusCodes.NOT_FOUND, "this course doesnt exist");
      await this.courseRepository.delete(courseId);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.log(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "error in DeleteCourseUseCase"
      );
    }
  }
}
