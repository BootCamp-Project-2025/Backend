import { ExperienceDTO } from "@/contexts/CoreContext/domain/interfaces/dtos/IExperienceDto";
import { IExperienceRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IExperienceRepository";
import ExperienceMapper from "@/contexts/CoreContext/mappers/ExperienceMapper";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateExperienceUseCase
  implements IUseCase<{ experience: ExperienceDTO; freelancerId: string }, void>
{
  constructor(
    @inject("IExperienceRepository")
    private experienceRepository: IExperienceRepository
  ) {}

  async execute(params?: {
    experience: ExperienceDTO;
    freelancerId: string;
  }): Promise<void> {
    if (!params) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Missing parameters for creating experience."
      );
    }

    const { experience: experienceDto, freelancerId } = params;
    const experience = ExperienceMapper.dtoToDomain(experienceDto);
    await this.experienceRepository.create(experience, freelancerId);
  }
}
