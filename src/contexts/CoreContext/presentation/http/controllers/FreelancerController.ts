import IFreelancerController from "@/contexts/CoreContext/domain/interfaces/controllers/IFreelancerController";
import ISkillDto from "@/contexts/CoreContext/domain/interfaces/dtos/ISkillDto";
import { IFreelancerService } from "@/contexts/CoreContext/domain/interfaces/services/IFreelancerService";
import { Skill } from "@/contexts/CoreContext/domain/entities/Skill";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
@injectable()
export default class FreelancerController implements IFreelancerController {
  constructor(
    @inject("IFreelancerService") private freelancerService: IFreelancerService
  ) {}
  public editSkill = async (req: Request, res: Response): Promise<void> => {
    const body: ISkillDto = req.body as ISkillDto;
    if (body.skillId === undefined)
      throw new ApiError(StatusCodes.BAD_REQUEST, "the skill id is needed");
    const skill: Skill = Skill.create(
      { ...body, freelancerId: req.params.freelancerId },
      new UniqueEntityID(body.skillId)
    );
    await this.freelancerService.editSkill(skill);
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
    await this.freelancerService.deleteSkill(skill);
    res.status(200).json();
  };
  public getSkills = async (req: Request, res: Response): Promise<void> => {
    const skills = await this.freelancerService.getSkills(
      req.params.freelancerId
    );
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
}
