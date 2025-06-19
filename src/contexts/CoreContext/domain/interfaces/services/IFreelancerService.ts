import { Skill } from "../../entities/Skill";

export interface IFreelancerService {
  addSkill(skill: Skill, freelancerId: string): Promise<Skill[]>;
  editSkill(skill: Skill, freelancerId: string): Promise<Skill>;
  deleteSkill(skill: Skill, freelancerId: string): Promise<Skill>;
  getSkills(freelancerId: string): Promise<Skill[]>;
}
