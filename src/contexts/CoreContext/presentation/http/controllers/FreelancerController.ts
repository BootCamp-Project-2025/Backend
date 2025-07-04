import IFreelancerController from "@/contexts/CoreContext/domain/interfaces/controllers/IFreelancerController";
import ISkillDto from "@/contexts/CoreContext/domain/interfaces/dtos/ISkillDto";
import { Skill } from "@/contexts/CoreContext/domain/entities/Skill";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { ISkillService } from "@/contexts/CoreContext/domain/interfaces/services/ISkillService";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";

@injectable()
export default class FreelancerController implements IFreelancerController {
  constructor(@inject("ISkillService") private skillService: ISkillService) {}

  public editSkill = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log(req.params.skillId);
      req.body.skillId = req.params.skillId;
      const body: ISkillDto = req.body as ISkillDto;
      if (body.skillId === undefined)
        throw new ApiError(StatusCodes.BAD_REQUEST, "the skill id is needed");
      const skill: Skill = Skill.create(
        { ...body, freelancerId: req.params.freelancerId },
        new UniqueEntityID(body.skillId)
      );
      const data: ISkillDto = await this.skillService.editSkill(skill);
      const response = new SuccessResponseEntity(data, StatusCodes.OK);
      ResponseService.send(res, response);
    } catch {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "an unknown error occurred "
      );
    }
  };

  public deleteSkill = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("delete", req.params.skillId);
      req.body.skillId = req.params.skillId;
      const body: ISkillDto = req.body as ISkillDto;
      if (body.skillId === undefined)
        throw new ApiError(StatusCodes.BAD_REQUEST, "the skill id is needed");
      const skill: Skill = Skill.create(
        { ...body, freelancerId: req.params.freelancerId },
        new UniqueEntityID(body.skillId)
      );
      await this.skillService.deleteSkill(skill);
      ResponseService.send(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "",
      });
    } catch {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "an unknown error occurred "
      );
    }
  };

  public getSkills = async (req: Request, res: Response): Promise<void> => {
    try {
      const skills: ISkillDto[] = await this.skillService.getSkills(
        req.params.freelancerId
      );
      const response = new SuccessResponseEntity(skills, StatusCodes.OK);
      ResponseService.send(res, response);
    } catch {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "an unknown error occurred "
      );
    }
  };

  public addSkill = async (req: Request, res: Response): Promise<void> => {
    try {
      const body: ISkillDto = req.body as ISkillDto;
      const skill: Skill = Skill.create(
        { ...body, freelancerId: req.params.freelancerId },
        new UniqueEntityID()
      );
      const data: ISkillDto = await this.skillService.addSkill(skill);
      const response = new SuccessResponseEntity(data, StatusCodes.CREATED);
      ResponseService.send(res, response);
    } catch {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "an unknown error occurred "
      );
    }
  };
}
