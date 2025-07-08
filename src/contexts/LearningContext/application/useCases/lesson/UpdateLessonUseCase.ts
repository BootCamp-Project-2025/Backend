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
  async execute(lesson: Lesson): Promise<Lesson> {
    try {
      const existingLesson = await this.lessonRepository.findById(
        lesson.id.toString()
      );
      if (!existingLesson) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Lesson not found");
      }
      if (existingLesson.compareTo(lesson))
        throw new ApiError(StatusCodes.BAD_REQUEST, "Lesson not changed");
      return await this.lessonRepository.update(lesson);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "error executing the update"
      );
    }
  }
}
