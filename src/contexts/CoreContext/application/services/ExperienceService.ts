import { inject, injectable } from "tsyringe";
import { IExperiences } from "../../domain/interfaces/services/IExperienceService";
import { IExperienceDTO } from "../../domain/interfaces/dtos/IExperienceDto";
import { Experience } from "../../domain/entities/Experience";
import { ExperienceMapper } from "../../mappers/ExperienceMapper";

import { GetExperiencesUseCase } from "../useCases/experiences/GetExperienceUseCase";
import { CreateExperienceUseCase } from "../useCases/experiences/CreateExperienceUseCase";
import { UpdateExperienceUseCase } from "../useCases/experiences/UpdateExperienceUseCase";
import { DeleteExperienceUseCase } from "../useCases/experiences/DeleteExperienceUseCase";
import { GetExperienceByIdUseCase } from "../useCases/experiences/GetExperienceById";

import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

@injectable()
export class ExperienceService implements IExperiences {
  constructor(
    @inject("GetExperiencesUseCase")
    private readonly getExperiencesUseCase: GetExperiencesUseCase,

    @inject("CreateExperienceUseCase")
    private readonly createExperienceUseCase: CreateExperienceUseCase,

    @inject("UpdateExperienceUseCase")
    private readonly updateExperienceUseCase: UpdateExperienceUseCase,

    @inject("DeleteExperienceUseCase")
    private readonly deleteExperienceUseCase: DeleteExperienceUseCase,

    @inject("GetExperienceByIdUseCase")
    private readonly getExperienceByIdUseCase: GetExperienceByIdUseCase
  ) {}

  async getAll(freelancerId: string): Promise<IExperienceDTO[]> {
    try {
      const experiences: Experience[] =
        await this.getExperiencesUseCase.execute(freelancerId);
      return experiences.map(ExperienceMapper.prototype.mapDomainToDto);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error fetching experiences"
      );
    }
  }

  async getById(experienceId: string): Promise<IExperienceDTO> {
    try {
      const experience =
        await this.getExperienceByIdUseCase.execute(experienceId);
      if (!experience) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Experience not found");
      }
      return ExperienceMapper.prototype.mapDomainToDto(experience);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error fetching experience"
      );
    }
  }

  async create(dto: IExperienceDTO): Promise<IExperienceDTO> {
    try {
      const newExperience = await this.createExperienceUseCase.execute({
        experience: dto,
        freelancerId: dto.freelancerId,
      });
      return ExperienceMapper.prototype.mapDomainToDto(newExperience);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error creating experience"
      );
    }
  }

  async update(dto: IExperienceDTO): Promise<IExperienceDTO> {
    try {
      if (!dto.id) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          "Experience ID is required for update"
        );
      }

      const existing = await this.getExperienceByIdUseCase.execute(dto.id);
      if (!existing) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Experience not found");
      }

      const domain = ExperienceMapper.prototype.mapDtoToDomain(dto);
      const updated = await this.updateExperienceUseCase.execute({
        experienceId: dto.id,
        experience: domain,
        freelancerId: dto.freelancerId,
      });
      return ExperienceMapper.prototype.mapDomainToDto(updated);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error updating experience"
      );
    }
  }

  async delete(experienceId: string, freelancerId: string): Promise<void> {
    try {
      const existing =
        await this.getExperienceByIdUseCase.execute(experienceId);
      if (!existing) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Experience not found");
      }

      if (existing.props.freelancerId !== freelancerId) {
        throw new ApiError(
          StatusCodes.FORBIDDEN,
          "This freelancer is not authorized to delete this experience."
        );
      }

      await this.deleteExperienceUseCase.execute(experienceId);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error deleting experience"
      );
    }
  }
}
