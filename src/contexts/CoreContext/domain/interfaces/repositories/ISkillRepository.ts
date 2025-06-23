import { IRepository } from "@/contexts/Shared/domain/repository/IRepository";
import { Skill } from "../../entities/Skill";
import { Freelancer } from "../../aggregates/Freelancer";

export interface ISkillRepository extends IRepository<Skill> {
  save(freelancer: Freelancer): Promise<void>;
  getSkillsById(freelancerId: string): Promise<Skill[]>;
}
