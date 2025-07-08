import { IExperienceController } from "@/contexts/CoreContext/domain/interfaces/controllers/IExperienceController";
import { IExperiences } from "@/contexts/CoreContext/domain/interfaces/services/IExperienceService";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { IExperienceDTO } from "@/contexts/CoreContext/domain/interfaces/dtos/IExperienceDto";

@injectable()
export class ExperienceController implements IExperienceController {
  constructor(
    @inject("IExperienceService")
    private readonly experienceService: IExperiences
  ) {}

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.params);
      const freelancerId = req.params.freelancerId;
      if (!freelancerId) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          "Freelancer ID is required."
        );
      }

      const experiences = await this.experienceService.getAll(freelancerId);
      const response = new SuccessResponseEntity(
        experiences,
        StatusCodes.OK,
        "Experiences retrieved successfully"
      );
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Server error");
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const experienceId = req.params.experienceId;
      const experience = await this.experienceService.getById(experienceId);

      const response = new SuccessResponseEntity(
        experience,
        StatusCodes.OK,
        "Experience retrieved successfully"
      );
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Server error");
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const freelancerId = req.params.freelancerId;
      if (!freelancerId) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          "Freelancer ID is required."
        );
      }

      const experience: IExperienceDTO = {
        ...req.body,
        freelancerId,
      };

      const newExperience = await this.experienceService.create(experience);

      const response = new SuccessResponseEntity(
        newExperience,
        StatusCodes.CREATED,
        "Experience created successfully"
      );
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Server error");
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const freelancerId = req.params.freelancerId;
      const experienceId = req.params.experienceId;
      if (!freelancerId || !experienceId) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          "Freelancer ID and Experience ID are required."
        );
      }

      const experience: IExperienceDTO = {
        ...req.body,
        id: experienceId,
        freelancerId,
      };

      const updated = await this.experienceService.update(experience);
      const response = new SuccessResponseEntity(
        updated,
        StatusCodes.OK,
        "Experiences updated successfully"
      );
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Server error");
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const experienceId = req.params.experienceId;
      const freelancerId = req.params.freelancerId;
      await this.experienceService.delete(experienceId, freelancerId);
      const response = new SuccessResponseEntity(null, StatusCodes.NO_CONTENT);
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Server error");
    }
  }
}
