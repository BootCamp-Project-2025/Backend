import IFreelancerController from "@/contexts/CoreContext/domain/interfaces/controllers/IFreelancerController";
import ISkillDto from "@/contexts/CoreContext/domain/interfaces/dtos/ISkillDto";
import { Skill } from "@/contexts/CoreContext/domain/entities/Skill";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { ISkillService } from "@/contexts/CoreContext/domain/interfaces/services/ISkillService";
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
    const data: ISkillDto = await this.skillService.editSkill(skill);
    res.status(200).json(data);
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
    const skills: ISkillDto[] = await this.skillService.getSkills(
      req.params.freelancerId
    );
    res.status(200).json(skills);
  };

  public addSkill = async (req: Request, res: Response): Promise<void> => {
    try {
      const body: ISkillDto = req.body as ISkillDto;
      const skill: Skill = Skill.create(
        { ...body, freelancerId: req.params.freelancerId },
        new UniqueEntityID()
      );
      const data: ISkillDto = await this.skillService.addSkill(skill);
      res.status(201).json(data);
    } catch (error) {
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  };
}
