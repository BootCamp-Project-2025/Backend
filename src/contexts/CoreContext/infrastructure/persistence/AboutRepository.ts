import { injectable } from "tsyringe";
import { IAboutRepository } from "../../domain/interfaces/repositories/IAboutRepository";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import prismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { About } from "../../domain/valueObjects/About";

@injectable()
export class AboutRepository implements IAboutRepository {
  async get(freelancerId: string): Promise<About> {
    try {
      const user = await prismaClient.freelancer.findUnique({
        where: { id: freelancerId },
        select: { about: true },
      });

      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Not user found");
      }
      return About.update(user.about);
    } catch (error) {
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error retrieving About"
      );
    }
  }

  async update(freelancerId: string, newAbout: About): Promise<void> {
    try {
      await prismaClient.freelancer.update({
        where: { id: freelancerId },
        data: { about: newAbout.value },
      });
    } catch (error) {
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error updating About"
      );
    }
  }
}
