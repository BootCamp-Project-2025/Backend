import { Module } from "@/contexts/LearningContext/domain/entities/Module";
import IModuleRepository from "@/contexts/LearningContext/domain/interfaces/IModuleRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export default class GetAllModulesUseCase
  implements IUseCase<string, Module[]>
{
  constructor(
    @inject("IModuleRepository")
    private readonly moduleRepository: IModuleRepository
  ) {}
  async execute(courseId: string): Promise<Module[]> {
    try {
      return await this.moduleRepository.findByCourseId(courseId);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "error executing the get"
      );
    }
  }
}
