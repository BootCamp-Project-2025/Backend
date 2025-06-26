import { inject, injectable } from "tsyringe";
import { Experience } from "@/contexts/CoreContext/domain/entities/Experience";
import { IExperienceDTO } from "@/contexts/CoreContext/domain/interfaces/dtos/IExperienceDto";
import { IExperienceRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IExperienceRepository";
import { IFreelancerRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository";
import { ExperienceMapper } from "@/contexts/CoreContext/mappers/ExperienceMapper";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

@injectable()
export class CreateExperienceUseCase
  implements
    IUseCase<{ experience: IExperienceDTO; freelancerId: string }, Experience>
{
  constructor(
    @inject("IExperienceRepository")
    private readonly experienceRepository: IExperienceRepository,

    @inject("IFreelancerRepository")
    private readonly freelancerRepository: IFreelancerRepository
  ) {}

  async execute(params?: {
    experience: IExperienceDTO;
    freelancerId: string;
  }): Promise<Experience> {
    try {
      if (!params) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          "Missing parameters for creating experience."
        );
      }

      const { experience: dto, freelancerId } = params;

      const freelancer = await this.freelancerRepository.getById(freelancerId);
      if (!freelancer) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Freelancer not found.");
      }

      const experience = ExperienceMapper.prototype.mapDtoToDomain({
        ...dto,
        freelancerId,
      });

      const created = await this.experienceRepository.create(
        experience,
        freelancerId
      );
      return created;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Server error while creating experience."
      );
    }
  }
}
