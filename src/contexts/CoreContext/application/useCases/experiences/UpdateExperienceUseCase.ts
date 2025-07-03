import { inject, injectable } from "tsyringe";
import { Experience } from "@/contexts/CoreContext/domain/entities/Experience";
import { IExperienceRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IExperienceRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { IFreelancerRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository";

@injectable()
export class UpdateExperienceUseCase
  implements
    IUseCase<
      {
        experienceId: string;
        experience: Experience;
        freelancerId: string;
      },
      Experience
    >
{
  constructor(
    @inject("IExperienceRepository")
    private readonly experienceRepository: IExperienceRepository,

    @inject("IFreelancerRepository")
    private readonly freelancerRepository: IFreelancerRepository
  ) {}

  async execute(params: {
    experienceId: string;
    experience: Experience;
    freelancerId: string;
  }): Promise<Experience> {
    try {
      const { experienceId, experience, freelancerId } = params;

      if (!experienceId || !freelancerId || !experience) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          "Missing parameters for updating experience."
        );
      }

      const freelancer = await this.freelancerRepository.getById(freelancerId);
      if (!freelancer) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Freelancer not found.");
      }

      const existing = await this.experienceRepository.findById(experienceId);
      if (!existing) {
        throw new ApiError(
          StatusCodes.NOT_FOUND,
          "Experience not found for update."
        );
      }

      const updatedExperience = await this.experienceRepository.update(
        experienceId,
        experience,
        freelancerId
      );
      return updatedExperience;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Server error while updating experience."
      );
    }
  }
}
