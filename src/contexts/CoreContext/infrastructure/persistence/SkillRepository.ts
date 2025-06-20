import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { Freelancer } from "../../domain/aggregates/Freelancer";
import { Skill } from "../../domain/entities/Skill";
import { ISkillRepository } from "../../domain/interfaces/repositories/ISkillRepository";
import { skillMapper } from "../../mappers/SkillMapper";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

export default class SkillRepository implements ISkillRepository {
  async save(freelancer: Freelancer): Promise<void> {
    if (freelancer.skills.getNewItems().length > 0) {
      const dbSkills = skillMapper.mapArrayDomainToPersistance(
        freelancer.skills.getNewItems()
      );
      await PrismaClient.skill.createMany({ data: dbSkills });
    }
    if (freelancer.skills.getEditedItems().length > 0) {
      freelancer.skills
        .getEditedItems()
        .map(async (skill) => await this.update(skill.id.toString(), skill));
    }
    if (freelancer.skills.getRemovedItems().length > 0) {
      freelancer.skills
        .getRemovedItems()
        .map(async (skill) => await this.delete(skill.id.toString()));
    }
  }

  async getSkillsById(freelancerId: string): Promise<Skill[]> {
    const dbData = await PrismaClient.skill.findMany({
      where: { freelancerId: freelancerId },
    });
    return skillMapper.mapArrayPersistanceToDomain(dbData);
  }

  async getAll(): Promise<Skill[]> {
    const dbData = await PrismaClient.skill.findMany();
    return skillMapper.mapArrayPersistanceToDomain(dbData);
  }

  async getById(id: string): Promise<Skill | null> {
    const dbData = await PrismaClient.skill.findUnique({
      where: { id: id },
    });
    if (dbData === null)
      throw new ApiError(StatusCodes.NOT_FOUND, "the skill doesnt exist");
    return skillMapper.mapPersistanceToDomain(dbData);
  }

  async delete(id: string): Promise<void> {
    await PrismaClient.skill.delete({ where: { id: id } });
  }

  async create(object: Skill): Promise<void> {
    const dbSkill = skillMapper.mapDomainToPersistance(object);
    await PrismaClient.skill.create({ data: dbSkill });
  }

  async update(id: string, object: Skill): Promise<void> {
    const dbSkill = skillMapper.mapDomainToPersistance(object);
    await PrismaClient.skill.update({ data: dbSkill, where: { id: id } });
  }
}
