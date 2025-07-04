import { Module } from "@/contexts/LearningContext/domain/entities/Module";
import { ICourseRepository } from "@/contexts/LearningContext/domain/interfaces/ICourseRepository";
import IModuleRepository from "@/contexts/LearningContext/domain/interfaces/IModuleRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import ModuleMapper from "@/contexts/LearningContext/mappers/ModuleMapper";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export default class CreateModuleUseCase implements IUseCase<Module, Module> {
  constructor(
    @inject("IModuleRepository")
    private readonly moduleRepository: IModuleRepository,
    @inject("IFreelancerRepository")
    private readonly courseRepository: ICourseRepository
  ) {}
  async execute(newModule: Module): Promise<Module> {
    try {
      const course = await this.courseRepository.findById(
        newModule.props.courseId.toString()
      );
      if (!course)
        throw new ApiError(StatusCodes.NOT_FOUND, "Course not found");
      course.props.modules.add(newModule);
      const moduleDto = ModuleMapper.DomainToDto(newModule);
      await this.moduleRepository.create(moduleDto);
      return newModule;
    } catch (error) {
      console.error("Error in UpdateModuleUseCase:", error);
      throw error;
    }
  }
}
