import { inject, injectable } from "tsyringe";
import { Experience } from "../../domain/entities/Experience";
import { ExperienceDTO } from "../../domain/interfaces/dtos/IExperienceDto";
import ExperienceMapper from "../../mappers/ExperienceMapper";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { IExperiences } from "../../domain/interfaces/services/IExperienceService";
import { GetExperiencesUseCase } from "../useCases/experiences/GetExperienceUseCase";
import { CreateExperienceUseCase } from "../useCases/experiences/CreateExperienceUseCase";
import { UpdateExperienceUseCase } from "../useCases/experiences/UpdateExperienceUseCase";
import { DeleteExperienceUseCase } from "../useCases/experiences/DeleteExperienceUseCase";
import { GetExperienceByIdUseCase } from "../useCases/experiences/GetExperienceById";
import { StatusCodes } from "http-status-codes";

@injectable()
export class ExperienceService implements IExperiences {
  constructor(
    @inject("GetExperiencesUseCase")
    private getExperiencesUseCase: GetExperiencesUseCase,
    @inject("CreateExperienceUseCase")
    private createExperienceUseCase: CreateExperienceUseCase,
    @inject("UpdateExperienceUseCase")
    private updateExperienceUseCase: UpdateExperienceUseCase,
    @inject("DeleteExperienceUseCase")
    private deleteExperienceUseCase: DeleteExperienceUseCase,
    @inject("GetExperienceByIdUseCase")
    private getExperienceByIdUseCase: GetExperienceByIdUseCase
  ) {}

  async getAll(id: string): Promise<ExperienceDTO[]> {
    const experiences: Experience[] =
      await this.getExperiencesUseCase.execute(id);
    return experiences.map(ExperienceMapper.domainToDto);
  }

  create(experience: ExperienceDTO, freelancerId: string): Promise<void> {
    return this.createExperienceUseCase.execute({ experience, freelancerId });
  }

  async delete(experienceId: string): Promise<void> {
    const savedExperience =
      await this.getExperienceByIdUseCase.execute(experienceId);
    if (!savedExperience) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Experience not found");
    }
    return this.deleteExperienceUseCase.execute(experienceId);
  }

  async update(
    experienceId: string,
    experience: ExperienceDTO,
    freelancerId: string
  ): Promise<void> {
    const experienceDomain = ExperienceMapper.dtoToDomain(
      experience,
      experienceId
    );
    const savedExperience =
      await this.getExperienceByIdUseCase.execute(experienceId);
    if (!savedExperience) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Experience not found");
    }
    return this.updateExperienceUseCase.execute({
      experienceId,
      experience: experienceDomain,
      freelancerId,
    });
  }

  async getById(experienceId: string): Promise<ExperienceDTO | null> {
    const experience =
      await this.getExperienceByIdUseCase.execute(experienceId);
    if (!experience) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Experience not found");
    }
    return ExperienceMapper.domainToDto(experience);
  }
}
