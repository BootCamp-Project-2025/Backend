import { Module } from "@/contexts/LearningContext/domain/entities/Module";
import { ICourseRepository } from "@/contexts/LearningContext/domain/interfaces/ICourseRepository";
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
export default class DeleteModuleUseCase implements IUseCase<string, void> {
  constructor(
    @inject("IModuleRepository")
    private readonly moduleRepository: IModuleRepository,
    @inject("ICourseRepository")
    private readonly courseRepository: ICourseRepository,
    @inject("GetAllModulesUseCase")
    private readonly getAllModulesUseCase: IUseCase<string, Module[]>
  ) {}

  async execute(moduleId: string): Promise<void> {
    try {
      if ((await this.moduleRepository.findById(moduleId)) === null)
        throw new ApiError(StatusCodes.BAD_REQUEST, "Module doesnt exist");

      const courseId =
        await this.moduleRepository.findCourseIdByModuleId(moduleId);

      await this.moduleRepository.delete(moduleId);

      const course = await this.courseRepository.findById(courseId);
      if (!course)
        throw new ApiError(StatusCodes.NOT_FOUND, "Course not found");

      const modules = await this.getAllModulesUseCase.execute(courseId);
      course.props.modules = Modules.create(modules);

      const event = new IndexResourceEvent({
        resource: "course",
        resourceDto: CourseMapper.domainToIndex(course),
      });

      globalEventDispatcher.dispatch(event);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "error executing the delete"
      );
    }
  }
}
