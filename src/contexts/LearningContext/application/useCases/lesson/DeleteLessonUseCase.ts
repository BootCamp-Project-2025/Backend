import ILessonRepository from "@/contexts/LearningContext/domain/interfaces/ILessonRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export default class DeleteLessonUseCase implements IUseCase<string, void> {
  constructor(
    @inject("ILessonRepository")
    private readonly lessonRepository: ILessonRepository
  ) {}
  async execute(lessonId: string): Promise<void> {
    try {
      await this.lessonRepository.delete(lessonId);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "error executing the delete"
      );
    }
  }
}
