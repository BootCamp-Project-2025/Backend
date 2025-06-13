import { User } from "../../aggregates/User";

export interface IFreelancerService {
  addSkill(): void;
  deleteSkill(): void;
  editSkill(): void;
  getSkills(): void;
  getAbout(id: string): Promise<string>;
  updateAbout(id: string, about: string): Promise<User>;
}
