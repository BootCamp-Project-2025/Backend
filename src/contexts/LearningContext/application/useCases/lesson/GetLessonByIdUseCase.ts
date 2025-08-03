import { Lesson } from "@/contexts/LearningContext/domain/entities/Lesson";
import ILessonRepository from "@/contexts/LearningContext/domain/interfaces/ILessonRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export default class GetLessonByIdUseCase implements IUseCase<string, Lesson> {
  constructor(
    @inject("ILessonRepository")
    private readonly lessonRepository: ILessonRepository
  ) {}

  async execute(lessonId: string): Promise<Lesson> {
    try {
      const lesson = await this.lessonRepository.findById(lessonId);
      if (!lesson) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Lesson not found");
      }
      return lesson;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error executing the get lesson by id"
      );
    }
  }
}
