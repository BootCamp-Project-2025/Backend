import IModuleRepository from "@/contexts/LearningContext/domain/interfaces/IModuleRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export default class DeleteModuleUseCase implements IUseCase<string, void> {
  constructor(
    @inject("IModuleRepository")
    private readonly moduleRepository: IModuleRepository
  ) {}
  async execute(moduleId: string): Promise<void> {
    try {
      await this.moduleRepository.delete(moduleId);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "error executing the delete"
      );
    }
  }
}
