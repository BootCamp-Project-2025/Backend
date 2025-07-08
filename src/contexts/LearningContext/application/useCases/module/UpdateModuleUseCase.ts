import { Module } from "@/contexts/LearningContext/domain/entities/Module";
import IModuleRepository from "@/contexts/LearningContext/domain/interfaces/IModuleRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export default class UpdateModuleUseCase implements IUseCase<Module, Module> {
  constructor(
    @inject("IModuleRepository")
    private readonly moduleRepository: IModuleRepository
  ) {}
  async execute(newModule: Module): Promise<Module> {
    try {
      const module = await this.moduleRepository.findById(
        newModule.id.toString()
      );
      if (module === null) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Module not found");
      }
      if (module.props.title === newModule.props.title)
        throw new ApiError(StatusCodes.BAD_REQUEST, "Module not changed");
      return await this.moduleRepository.update(newModule);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "error executing the update"
      );
    }
  }
}
