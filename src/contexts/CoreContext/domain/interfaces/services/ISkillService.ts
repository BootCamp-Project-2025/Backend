import { Skill } from "../../entities/Skill";
import ISkillDto from "../dtos/ISkillDto";

export interface ISkillService {
  editSkill(skill: Skill): Promise<void>;
  deleteSkill(skill: Skill): Promise<void>;
  addSkill(skill: Skill): Promise<void>;
  getSkills(freelancerId: string): Promise<ISkillDto[]>;
}
