import { Module } from "@/contexts/LearningContext/domain/entities/Module";
import { ICourseRepository } from "@/contexts/LearningContext/domain/interfaces/ICourseRepository";
import IModuleRepository from "@/contexts/LearningContext/domain/interfaces/IModuleRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export default class CreateModuleUseCase
  implements
    IUseCase<
      {
        module: Module;
        courseId: string;
      },
      Module
    >
{
  constructor(
    @inject("IModuleRepository")
    private readonly moduleRepository: IModuleRepository,
    @inject("ICourseRepository")
    private readonly courseRepository: ICourseRepository
  ) {}
  async execute({
    module,
    courseId,
  }: {
    module: Module;
    courseId: string;
  }): Promise<Module> {
    try {
      const course = await this.courseRepository.findById(courseId);
      if (!course)
        throw new ApiError(StatusCodes.NOT_FOUND, "Course not found");
      course.props.modules.add(module);
      const moduleDb = await this.moduleRepository.create(module, courseId);
      return moduleDb;
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
