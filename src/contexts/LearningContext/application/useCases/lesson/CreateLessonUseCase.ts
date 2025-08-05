import { Lesson } from "@/contexts/LearningContext/domain/entities/Lesson";
import { Module } from "@/contexts/LearningContext/domain/entities/Module";
import { ICourseRepository } from "@/contexts/LearningContext/domain/interfaces/ICourseRepository";
import ILessonRepository from "@/contexts/LearningContext/domain/interfaces/ILessonRepository";
import IModuleRepository from "@/contexts/LearningContext/domain/interfaces/IModuleRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Modules } from "@/contexts/LearningContext/domain/OneToMany/Modules";
import { CourseMapper } from "@/contexts/LearningContext/mappers/CourseMapper";
import { IndexResourceEvent } from "@/contexts/Shared/domain/events/IndexResourceEvent";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { globalEventDispatcher } from "@/eventRegister";
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

      const courseId =
        await this.moduleRepository.findCourseIdByModuleId(moduleId);

      const course = await this.courseRepository.findById(courseId);
      if (!course) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Course not found");
      }

      const modules = await this.getAllModulesUseCase.execute(courseId);
      course.props.modules = Modules.create(modules);

      const event = new IndexResourceEvent({
        resource: "course",
        resourceDto: CourseMapper.domainToIndex(course),
      });

      globalEventDispatcher.dispatch(event);

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
