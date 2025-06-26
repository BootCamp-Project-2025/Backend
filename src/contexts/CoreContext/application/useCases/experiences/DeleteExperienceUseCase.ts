import { inject, injectable } from "tsyringe";
import { IExperienceRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IExperienceRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

@injectable()
export class DeleteExperienceUseCase implements IUseCase<string, void> {
  constructor(
    @inject("IExperienceRepository")
    private readonly experienceRepository: IExperienceRepository
  ) {}

  async execute(experienceId: string): Promise<void> {
    try {
      if (!experienceId) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          "Missing experience ID to delete."
        );
      }
      await this.experienceRepository.delete(experienceId);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Server error while deleting experience."
      );
    }
  }
}
