import { Lesson } from "@/contexts/LearningContext/domain/entities/Lesson";
import { Module } from "@/contexts/LearningContext/domain/entities/Module";
import { ICourseRepository } from "@/contexts/LearningContext/domain/interfaces/ICourseRepository";
import ILessonRepository from "@/contexts/LearningContext/domain/interfaces/ILessonRepository";
import IModuleRepository from "@/contexts/LearningContext/domain/interfaces/IModuleRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

import { inject, injectable } from "tsyringe";

@injectable()
export default class CreateLessonUseCase
  implements
    IUseCase<
      {
        lesson: Lesson;
        moduleId: string;
      },
      Lesson
    >
{
  constructor(
    @inject("IModuleRepository")
    private readonly moduleRepository: IModuleRepository,
    @inject("ILessonRepository")
    private readonly lessonRepository: ILessonRepository,
    @inject("ICourseRepository")
    private readonly courseRepository: ICourseRepository,
    @inject("GetAllModulesUseCase")
    private readonly getAllModulesUseCase: IUseCase<string, Module[]>
  ) {}

  async execute({
    lesson,
    moduleId,
  }: {
    lesson: Lesson;
    moduleId: string;
  }): Promise<Lesson> {
    try {
      const module = await this.moduleRepository.findById(moduleId);
      if (!module)
        throw new ApiError(StatusCodes.NOT_FOUND, "Module not found");
      module.props.lessons.add(lesson);
      const lessonDb = await this.lessonRepository.create(lesson, moduleId);

      return lessonDb;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "error executing the create"
      );
    }
  }
}
