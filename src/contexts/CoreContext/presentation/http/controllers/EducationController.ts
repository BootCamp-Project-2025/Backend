import { IEducationController } from "@/contexts/CoreContext/domain/interfaces/controllers/IEducationController";
import { IEducationDto } from "@/contexts/CoreContext/domain/interfaces/dtos/IEducationDto";
import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { IEducationService } from "@/contexts/CoreContext/domain/interfaces/services/IEducationService";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { StatusCodes } from "http-status-codes";
import { educationMapper } from "@/contexts/CoreContext/mappers/EducationMapper";

@injectable()
export default class EducationController implements IEducationController {
  constructor(
    @inject("IEducationService") private educationService: IEducationService
  ) {}

  public getAllOfFreelancer = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { freelancerId } = req.params;
      const educations =
        await this.educationService.getAllOfFreelancer(freelancerId);
      const response = new SuccessResponseEntity(educations, StatusCodes.OK);
      ResponseService.send(res, response);
    } catch (error) {
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { freelancerId } = req.params;
      const education: IEducationDto = req.body as IEducationDto;
      const newEducation: IEducationDto =
        await this.educationService.addEducation({
          ...education,
          freelancerId: freelancerId,
        });
      const response = new SuccessResponseEntity(
        newEducation,
        StatusCodes.CREATED
      );
      ResponseService.send(res, response);
    } catch (error) {
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { freelancerId } = req.params;
      req.body.id = req.params.educationId;
      const education: IEducationDto = req.body as IEducationDto;
      await this.educationService.updateEducation(education, freelancerId);
      const response = new SuccessResponseEntity(education, StatusCodes.OK);
      ResponseService.send(res, response);
    } catch (error) {
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      req.body.id = req.params.educationId;
      const body: IEducationDto = req.body as IEducationDto;
      const education = educationMapper.mapDtoToDomain(body);
      await this.educationService.removeById(
        education,
        req.params.freelancerId
      );
      const response = new SuccessResponseEntity({}, StatusCodes.NO_CONTENT);
      ResponseService.send(res, response);
    } catch (error) {
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  };
}
