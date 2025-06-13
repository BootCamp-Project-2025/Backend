import { Skill } from "../../valueObjects/Skill";

export interface IFreelancerService {
  addSkill(skill: Skill, freelancerId: string): Promise<Skill>;
  getSkills(freelancerId: string): Promise<Skill[]>;
}
