import IFreelancerController from "@/contexts/CoreContext/domain/interfaces/controllers/IFreelancerController";
import ISkillDto from "@/contexts/CoreContext/domain/interfaces/dtos/ISkillDto";
import { IFreelancerService } from "@/contexts/CoreContext/domain/interfaces/services/IFreelancerService";
import { Skill } from "@/contexts/CoreContext/domain/valueObjects/Skill";
import SkillMapper from "@/contexts/CoreContext/mappers/SkillMapper";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
@injectable()
export default class FreelancerController implements IFreelancerController {
  constructor(
    @inject("IFreelancerService") private freelancerService: IFreelancerService
  ) {}
  getSkills = async (req: Request, res: Response): Promise<void> => {
    const skills = await this.freelancerService.getSkills(
      req.params.freelancerId
    );
    res.status(200).json(skills);
  };
  addSkill = async (req: Request, res: Response): Promise<void> => {
    const body: ISkillDto = req.body as ISkillDto;
    const skill: Skill = SkillMapper.dtoToDomain(body);
    await this.freelancerService.addSkill(skill, req.params.freelancerId);
    res.status(200).json(skill);
  };
}
