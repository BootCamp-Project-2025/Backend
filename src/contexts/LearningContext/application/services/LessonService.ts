import { inject, injectable } from "tsyringe";
import IUseCase from "../../domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import ILessonService from "../../domain/interfaces/ILessonService";
import { Lesson } from "../../domain/entities/Lesson";

@injectable()
export default class LessonService implements ILessonService {
  constructor(
    @inject("CreateLessonUseCase")
    private readonly createLessonUseCase: IUseCase<
      {
        lesson: Lesson;
        moduleId: string;
      },
      Lesson
    >,
    @inject("DeleteLessonUseCase")
    private readonly deleteLessonUseCase: IUseCase<string, void>,
    @inject("UpdateLessonUseCase")
    private readonly updateLessonUseCase: IUseCase<Lesson, Lesson>
  ) {}
  async create(lesson: Lesson, moduleId: string): Promise<Lesson> {
    try {
      return await this.createLessonUseCase.execute({ lesson, moduleId });
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error accesing the execution"
      );
    }
  }
  async delete(lessonId: string): Promise<void> {
    try {
      await this.deleteLessonUseCase.execute(lessonId);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error accesing the execution"
      );
    }
  }
  async update(lesson: Lesson): Promise<Lesson> {
    try {
      return await this.updateLessonUseCase.execute(lesson);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error accesing the execution"
      );
    }
  }
}
