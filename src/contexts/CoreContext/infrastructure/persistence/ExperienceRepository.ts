import { injectable } from "tsyringe";
import { Experience } from "../../domain/entities/Experience";
import { IExperienceRepository } from "../../domain/interfaces/repositories/IExperienceRepository";
import prismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { ExperienceMapper } from "../../mappers/ExperienceMapper";

@injectable()
export class ExperienceRepository implements IExperienceRepository {
  async getAll(freelancerId: string): Promise<Experience[]> {
    try {
      const experiences = await prismaClient.experience.findMany({
        where: { freelancerId },
      });

      return experiences.map((exp) =>
        ExperienceMapper.prototype.mapPersistanceToDomain(exp)
      );
    } catch (error) {
      console.log(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error fetching experiences."
      );
    }
  }

  async findById(experienceId: string): Promise<Experience | null> {
    try {
      const experience = await prismaClient.experience.findUnique({
        where: { id: experienceId },
      });

      if (!experience) {
        return null;
      }

      return ExperienceMapper.prototype.mapPersistanceToDomain(experience);
    } catch (error) {
      console.log(error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error retrieving experience."
      );
    }
  }

  async create(experience: Experience): Promise<Experience> {
    try {
      const data =
        ExperienceMapper.prototype.mapDomainToPersistance(experience);
      const created = await prismaClient.experience.create({
        data,
      });

      return ExperienceMapper.prototype.mapPersistanceToDomain(created);
    } catch (error) {
      console.log(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error creating experience."
      );
    }
  }

  async update(
    experienceId: string,
    experience: Experience
  ): Promise<Experience> {
    try {
      const data =
        ExperienceMapper.prototype.mapDomainToPersistance(experience);

      const updatedExperience = await prismaClient.experience.update({
        where: { id: experienceId },
        data,
      });
      return ExperienceMapper.prototype.mapPersistanceToDomain(
        updatedExperience
      );
    } catch (error) {
      console.log(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error updating experience."
      );
    }
  }

  async delete(experienceId: string): Promise<void> {
    try {
      await prismaClient.experience.delete({
        where: { id: experienceId },
      });
    } catch (error) {
      console.log(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error deleting experience."
      );
    }
  }
}
