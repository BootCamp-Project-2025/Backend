import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { Freelancer } from "../../domain/entities/Freelancer";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";
import { Skill } from "../../domain/valueObjects/Skill";
import SkillMapper from "../../mappers/SkillMapper";
import { injectable } from "tsyringe";

@injectable()
export default class FreelancerRepository implements IFreelancerRepository {
  async addSkill(freelancerId: string, skill: Skill): Promise<Skill> {
    const skillDb = SkillMapper.domainToPersistance(skill);
    await PrismaClient.freelancer.update({
      where: { id: freelancerId },
      data: { skills: { create: skillDb } },
    });
    return skill;
  }
  async getSkills(freelancerId: string): Promise<Skill[]> {
    const skillsDB = await PrismaClient.skill.findMany({
      where: { freelancerId: freelancerId },
    });
    return SkillMapper.persistanceToDomainBulk(skillsDB);
  }
  getAll(): Promise<Freelancer[]> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<Freelancer | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<string | void> {
    throw new Error("Method not implemented.");
  }
  create(): Promise<Freelancer> {
    throw new Error("Method not implemented.");
  }
  update(id: string, object: Freelancer): Promise<Freelancer> {
    throw new Error("Method not implemented.");
  }
}
