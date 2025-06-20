import { Skill } from "../../entities/Skill";

export interface IFreelancerService {
  addSkill(skill: Skill): Promise<Skill[]>;
  editSkill(skill: Skill): Promise<Skill>;
  deleteSkill(skill: Skill): Promise<Skill>;
  getSkills(freelancerId: string): Promise<Skill[]>;
}
