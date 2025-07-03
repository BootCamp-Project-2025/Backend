import { inject, injectable } from "tsyringe";
import { Experience } from "@/contexts/CoreContext/domain/entities/Experience";
import { IExperienceRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IExperienceRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { IFreelancerRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository";

@injectable()
export class GetExperiencesUseCase implements IUseCase<string, Experience[]> {
  constructor(
    @inject("IExperienceRepository")
    private readonly repo: IExperienceRepository,
    @inject("IFreelancerRepository")
    private readonly freelancerRepository: IFreelancerRepository
  ) {}

  async execute(freelancerId: string): Promise<Experience[]> {
    try {
      if (!freelancerId) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          "Freelancer ID is required."
        );
      }

      const freelancer = await this.freelancerRepository.getById(freelancerId);
      if (!freelancer) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Freelancer not found.");
      }

      const experiences = await this.repo.getAll(freelancerId);
      return experiences;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Server error while fetching experiences."
      );
    }
  }
}
