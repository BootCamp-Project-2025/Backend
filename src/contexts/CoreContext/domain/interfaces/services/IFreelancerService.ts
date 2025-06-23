import { Skill } from "../../entities/Skill";

import { About } from "../../valueObjects/About";

export interface IFreelancerService {
  addSkill(skill: Skill): Promise<Skill[]>;
  editSkill(skill: Skill): Promise<Skill>;
  deleteSkill(skill: Skill): Promise<Skill>;
  getSkills(freelancerId: string): Promise<Skill[]>;
  getAbout(id: string): Promise<About>;
  updateAbout(id: string, about: About): Promise<About>;
}
