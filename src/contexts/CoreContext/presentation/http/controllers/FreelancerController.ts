import IFreelancerController from "@/contexts/CoreContext/domain/interfaces/controllers/IFreelancerController";
import ISkillDto from "@/contexts/CoreContext/domain/interfaces/dtos/ISkillDto";
import { Skill } from "@/contexts/CoreContext/domain/entities/Skill";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { ISkillService } from "@/contexts/CoreContext/domain/interfaces/services/ISkillService";
import { About } from "@/contexts/CoreContext/domain/valueObjects/About";

@injectable()
export default class FreelancerController implements IFreelancerController {
  constructor(@inject("ISkillService") private skillService: ISkillService) {}

  public editSkill = async (req: Request, res: Response): Promise<void> => {
    const body: ISkillDto = req.body as ISkillDto;
    if (body.skillId === undefined)
      throw new ApiError(StatusCodes.BAD_REQUEST, "the skill id is needed");
    const skill: Skill = Skill.create(
      { ...body, freelancerId: req.params.freelancerId },
      new UniqueEntityID(body.skillId)
    );
    await this.skillService.editSkill(skill);
    res.status(200).json();
  };

  public deleteSkill = async (req: Request, res: Response): Promise<void> => {
    const body: ISkillDto = req.body as ISkillDto;
    if (body.skillId === undefined)
      throw new ApiError(StatusCodes.BAD_REQUEST, "the skill id is needed");
    const skill: Skill = Skill.create(
      { ...body, freelancerId: req.params.freelancerId },
      new UniqueEntityID(body.skillId)
    );
    await this.skillService.deleteSkill(skill);
    res.status(200).json();
  };

  public getSkills = async (req: Request, res: Response): Promise<void> => {
    const skills = await this.skillService.getSkills(req.params.freelancerId);
    res.status(200).json(skills);
  };

  public addSkill = async (req: Request, res: Response): Promise<void> => {
    const body: ISkillDto = req.body as ISkillDto;
    const skill: Skill = Skill.create(
      { ...body, freelancerId: req.params.freelancerId },
      new UniqueEntityID()
    );
    console.log(skill);
    await this.freelancerService.addSkill(skill);
    res.status(201).json();
  };

  public getAbout = async (req: Request, res: Response): Promise<void> => {
    try {
      const freelancerId = req.params.freelancerId;
      const about: About | null =
        await this.freelancerService.getAbout(freelancerId);

      if (!about) {
        throw new ApiError(StatusCodes.NOT_FOUND, "About not found");
      }

      res.status(StatusCodes.OK).json({ about: about.value });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal server error" });
      }
    }
  };

  public updateAbout = async (req: Request, res: Response): Promise<void> => {
    try {
      const freelancerId = req.params.freelancerId;
      const { about } = req.body;

      if (!about || typeof about !== "string") {
        throw new ApiError(StatusCodes.BAD_REQUEST, "About text is required");
      }

      const aboutVO = About.create(about);
      await this.freelancerService.updateAbout(freelancerId, aboutVO);

      res
        .status(StatusCodes.OK)
        .json({ message: "About updated successfully" });
    } catch (error) {
      if (error instanceof Error && error.message.includes("About")) {
        throw new ApiError(StatusCodes.BAD_REQUEST, error.message);
      }
      throw error;
    }
  };
}
