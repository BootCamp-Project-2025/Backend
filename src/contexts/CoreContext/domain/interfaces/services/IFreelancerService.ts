import { User } from "../../aggregates/User";
import { IService } from "@/contexts/Shared/domain/service/IService";
import { Freelancer } from "../../entities/Freelancer";
export interface IFreelancerService extends IService<Freelancer> {
  addSkill(): void;
  deleteSkill(): void;
  editSkill(): void;
  getSkills(): void;
  getAbout(id: string): Promise<string>;
  updateAbout(id: string, about: string): Promise<User>;
}
