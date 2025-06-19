import { IRepository } from "@/contexts/Shared/domain/repository/IRepository";
import { Freelancer } from "../../aggregates/Freelancer";
import { Skill } from "../../entities/Skill";

export interface IFreelancerRepository extends IRepository<Freelancer> {
  editSkill(freelancerId: string, skill: Skill): Promise<Skill>;
  deleteSkill(skillId: string): Promise<Skill>;
  updateSkills(freelancerId: string, skill: Skill[]): Promise<Skill[]>;
  getSkills(freelancerId: string): Promise<Skill[]>;
  getSkillId(freelancerId: string, skill: Skill): Promise<string | undefined>;
}
