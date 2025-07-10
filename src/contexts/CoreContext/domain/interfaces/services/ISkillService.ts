import { Skill } from "../../entities/Skill";
import ISkillDto from "../dtos/ISkillDto";

export interface ISkillService {
  editSkill(skill: Skill): Promise<ISkillDto>;
  deleteSkill(skillId: string, freelancerId: string): Promise<void>;
  addSkill(skill: Skill): Promise<ISkillDto>;
  getSkills(freelancerId: string): Promise<ISkillDto[]>;
}
