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
import { About } from "@/contexts/CoreContext/domain/valueObjects/About";
import { IFreelancerService } from "@/contexts/CoreContext/domain/interfaces/services/IFreelancerService";

@injectable()
export default class FreelancerController implements IFreelancerController {
  constructor(
    @inject("ISkillService") private skillService: ISkillService,
    @inject("IFreelancerService")
    private freelancerService: IFreelancerService
  ) {}

  public editSkill = async (req: Request, res: Response): Promise<void> => {
    try {
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

  public getAbout = async (req: Request, res: Response): Promise<void> => {
    try {
      const freelancerId = req.params.freelancerId;

      const about: About | null =
        await this.freelancerService.getAbout(freelancerId);

      if (!about) {
        throw new ApiError(StatusCodes.NOT_FOUND, "About not found");
      }

      const response = new SuccessResponseEntity(
        { about: about.value },
        StatusCodes.OK
      );
      ResponseService.send(res, response);
    } catch {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "An unknown error occurred"
      );
    }
  };

  public updateAbout = async (req: Request, res: Response): Promise<void> => {
    try {
      const freelancerId = req.params.freelancerId;
      const { about } = req.body;

      if (!about || typeof about !== "string") {
        throw new ApiError(StatusCodes.BAD_REQUEST, "About text is required");
      }

      const aboutVO = About.update(about);
      await this.freelancerService.updateAbout(freelancerId, aboutVO);

      const response = new SuccessResponseEntity(
        { message: "About updated successfully" },
        StatusCodes.OK
      );
      ResponseService.send(res, response);
    } catch (error) {
      if (error instanceof Error && error.message.includes("About")) {
        throw new ApiError(StatusCodes.BAD_REQUEST, error.message);
      }

      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "An unknown error occurred"
      );
    }
  };
}
