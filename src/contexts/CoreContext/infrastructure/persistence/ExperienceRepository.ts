/* eslint-disable @typescript-eslint/no-unused-vars */
import { injectable } from "tsyringe";
import { Experience } from "../../domain/entities/Experience";
import { IExperienceRepository } from "../../domain/interfaces/repositories/IExperienceRepository";
import ExperienceMapper from "../../mappers/ExperienceMapper";
import prismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";

@injectable()
export class ExperienceRepository implements IExperienceRepository {
  async getAll(freelancerId: string): Promise<Experience[]> {
    try {
      const experiences = await prismaClient.experience.findMany({
        where: { freelancerId },
      });
      return experiences.map((exp) =>
        ExperienceMapper.persistenceToDomain(exp)
      );
    } catch (error) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error fetching experiences"
      );
    }
  }

  async findById(experienceId: string): Promise<Experience | null> {
    try {
      const experience = await prismaClient.experience.findUnique({
        where: { id: experienceId },
      });

      if (!experience) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Experience not found");
      }

      return ExperienceMapper.persistenceToDomain(experience);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error retrieving experience"
      );
    }
  }

  async create(experience: Experience, freelancerId: string): Promise<void> {
    try {
      const experienceData = ExperienceMapper.toPersistence(
        experience,
        freelancerId
      );

      await prismaClient.experience.create({
        data: experienceData,
      });
    } catch (error) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error creating experience"
      );
    }
  }

  async update(
    experienceId: string,
    experience: Experience,
    freelancerId: string
  ): Promise<void> {
    try {
      const experienceData = ExperienceMapper.toPersistence(
        experience,
        freelancerId
      );

      await prismaClient.experience.update({
        where: { id: experienceId },
        data: experienceData,
      });
    } catch (error) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error updating experience"
      );
    }
  }

  async delete(experienceId: string): Promise<void> {
    try {
      await prismaClient.experience.delete({
        where: { id: experienceId },
      });
    } catch (error) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error deleting experience"
      );
    }
  }
}
