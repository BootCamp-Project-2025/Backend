import { IRepository } from "@/contexts/Shared/domain/repository/IRepository";
import { Skill } from "../../entities/Skill";

export interface ISkillRepository extends IRepository<Skill> {
  getSkillsById(freelancerId: string): Promise<Skill[]>;
}
