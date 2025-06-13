import { IRepository } from "@/contexts/Shared/domain/repository/IRepository";
import { Freelancer } from "../../entities/Freelancer";
import { Skill } from "../../valueObjects/Skill";

export interface IFreelancerRepository extends IRepository<Freelancer> {
  addSkill(freelancerId: string, skill: Skill): Promise<Skill>;
  getSkills(freelancerId: string): Promise<Skill[]>;
}
