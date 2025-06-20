import { IExperienceRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IExperienceRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteExperienceUseCase implements IUseCase<string, void> {
  constructor(
    @inject("IExperienceRepository")
    private experienceRepository: IExperienceRepository
  ) {}

  async execute(experienceId: string): Promise<void> {
    if (!experienceId) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Missing parameters for deleting experience."
      );
    }
    await this.experienceRepository.delete(experienceId);
  }
}
