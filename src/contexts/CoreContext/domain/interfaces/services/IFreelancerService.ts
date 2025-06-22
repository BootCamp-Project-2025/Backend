import { About } from "../../valueObjects/About";

export interface IFreelancerService {
  addSkill(): void;
  deleteSkill(): void;
  editSkill(): void;
  getSkills(): void;
  getAbout(id: string): Promise<About>;
  updateAbout(id: string, about: About): Promise<About>;
}
