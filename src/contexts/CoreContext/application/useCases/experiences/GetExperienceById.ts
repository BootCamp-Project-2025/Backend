import { inject, injectable } from "tsyringe";
import { Experience } from "@/contexts/CoreContext/domain/entities/Experience";
import { IExperienceRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IExperienceRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

@injectable()
export class GetExperienceByIdUseCase
  implements IUseCase<string, Experience | null>
{
  constructor(
    @inject("IExperienceRepository")
    private readonly experienceRepository: IExperienceRepository
  ) {}

  async execute(experienceId: string): Promise<Experience | null> {
    try {
      if (!experienceId) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          "Experience ID is required."
        );
      }

      const experience = await this.experienceRepository.findById(experienceId);
      return experience;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Server error while fetching experience by ID."
      );
    }
  }
}
