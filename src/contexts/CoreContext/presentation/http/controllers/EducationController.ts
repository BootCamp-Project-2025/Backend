import { IEducationController } from "@/contexts/CoreContext/domain/interfaces/controllers/IEducationController";
import { IEducationDto } from "@/contexts/CoreContext/domain/interfaces/dtos/IEducationDto";
import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { IEducationService } from "@/contexts/CoreContext/domain/interfaces/services/IEducationService";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { StatusCodes } from "http-status-codes";

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
      console.log(education);
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      throw new ApiError(StatusCodes.NOT_IMPLEMENTED, "server error");
    } catch (error) {
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { educationId } = req.params;
      await this.educationService.removeById(educationId);
      const response = new SuccessResponseEntity({}, StatusCodes.NO_CONTENT);
      ResponseService.send(res, response);
    } catch (error) {
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  };
}
