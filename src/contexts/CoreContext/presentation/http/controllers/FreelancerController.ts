import IFreelancerController from "@/contexts/CoreContext/domain/interfaces/controllers/IFreelancerController";
import ISkillDto from "@/contexts/CoreContext/domain/interfaces/dtos/ISkillDto";
import { IFreelancerService } from "@/contexts/CoreContext/domain/interfaces/services/IFreelancerService";
import { Skill } from "@/contexts/CoreContext/domain/entities/Skill";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
@injectable()
export default class FreelancerController implements IFreelancerController {
  constructor(
    @inject("IFreelancerService") private freelancerService: IFreelancerService
  ) {}
  public editSkill = async (req: Request, res: Response): Promise<void> => {
    const body: ISkillDto = req.body as ISkillDto;
    const skill: Skill = Skill.create(body, new UniqueEntityID());
    await this.freelancerService.editSkill(skill, req.params.freelancerId);
    res.status(200).json(skill);
  };
  public deleteSkill = async (req: Request, res: Response): Promise<void> => {
    const body: ISkillDto = req.body as ISkillDto;
    const skill: Skill = Skill.create(body, new UniqueEntityID());
    await this.freelancerService.deleteSkill(skill, req.params.freelancerId);
    res.status(200).json(skill);
  };
  public getSkills = async (req: Request, res: Response): Promise<void> => {
    const skills = await this.freelancerService.getSkills(
      req.params.freelancerId
    );
    res.status(200).json(skills);
  };
  public addSkill = async (req: Request, res: Response): Promise<void> => {
    const body: ISkillDto = req.body as ISkillDto;
    const skill: Skill = Skill.create(body, new UniqueEntityID());
    const skillResponse = await this.freelancerService.addSkill(
      skill,
      req.params.freelancerId
    );
    res.status(200).json(skillResponse);
  };
}
