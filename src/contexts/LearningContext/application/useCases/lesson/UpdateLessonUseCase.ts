import { Lesson } from "@/contexts/LearningContext/domain/entities/Lesson";
import ILessonRepository from "@/contexts/LearningContext/domain/interfaces/ILessonRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export default class UpdateLessonUseCase implements IUseCase<Lesson, Lesson> {
  constructor(
    @inject("ILessonRepository")
    private readonly lessonRepository: ILessonRepository
  ) {}
  async execute(newLesson: Lesson): Promise<Lesson> {
    try {
      return await this.lessonRepository.update(newLesson);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "error executing the update"
      );
    }
  }
}
