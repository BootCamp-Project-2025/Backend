import { Skill } from "../../entities/Skill";
import ISkillDto from "../dtos/ISkillDto";

export interface ISkillService {
  editSkill(skill: Skill): Promise<ISkillDto>;
  deleteSkill(skill: Skill): Promise<void>;
  addSkill(skill: Skill): Promise<ISkillDto>;
  getSkills(freelancerId: string): Promise<ISkillDto[]>;
}
