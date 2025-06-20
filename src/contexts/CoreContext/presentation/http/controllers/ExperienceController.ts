import { IExperienceController } from "@/contexts/CoreContext/domain/interfaces/controllers/IExperienceController";
import { IExperiences } from "@/contexts/CoreContext/domain/interfaces/services/IExperienceService";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export class ExperienceController implements IExperienceController {
  constructor(
    @inject("IExperienceService")
    private readonly experienceService: IExperiences
  ) {}

  async getAll(req: Request, res: Response): Promise<void> {
    const freelancerId = req.params.id;
    const experiences = await this.experienceService.getAll(freelancerId);
    const response = new SuccessResponseEntity(
      experiences,
      StatusCodes.OK,
      "Experiences retrieved successfully"
    );
    ResponseService.send(res, response);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const experienceId = req.params.experienceId;
    const experience = await this.experienceService.getById(experienceId);
    const response = new SuccessResponseEntity(
      experience,
      StatusCodes.OK,
      "Experience retrieved successfully"
    );
    ResponseService.send(res, response);
  }

  async create(req: Request, res: Response): Promise<void> {
    const freelancerId = req.params.id;
    const experience = req.body;
    const newExperience = await this.experienceService.create(
      experience,
      freelancerId
    );

    const response = new SuccessResponseEntity(
      newExperience,
      StatusCodes.CREATED,
      "Experience created successfully"
    );
    ResponseService.send(res, response);
  }

  async update(req: Request, res: Response): Promise<void> {
    const freelancerId = req.params.id;
    const experienceId = req.params.experienceId;
    const experience = { ...req.body };
    await this.experienceService.update(experienceId, experience, freelancerId);
    const response = new SuccessResponseEntity(null, StatusCodes.NO_CONTENT);
    ResponseService.send(res, response);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const experienceId = req.params.experienceId;
    await this.experienceService.delete(experienceId);
    const response = new SuccessResponseEntity(null, StatusCodes.NO_CONTENT);
    ResponseService.send(res, response);
  }
}
