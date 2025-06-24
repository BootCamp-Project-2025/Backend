import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { Skill } from "../../domain/entities/Skill";
import { ISkillRepository } from "../../domain/interfaces/repositories/ISkillRepository";
import { skillMapper } from "../../mappers/SkillMapper";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

export default class SkillRepository implements ISkillRepository {
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

  async create(object: Skill): Promise<Skill> {
    const dbSkill = skillMapper.mapDomainToPersistance(object);
    console.log(dbSkill);
    const dbData = await PrismaClient.skill.create({ data: dbSkill });
    return skillMapper.mapPersistanceToDomain(dbData);
  }

  async update(id: string, object: Skill): Promise<Skill> {
    const dbSkill = skillMapper.mapDomainToPersistance(object);
    const dbData = await PrismaClient.skill.update({
      data: dbSkill,
      where: { id: id },
    });
    if (dbData === null)
      throw new ApiError(StatusCodes.NOT_FOUND, "the skill doesnt exist");
    return skillMapper.mapPersistanceToDomain(dbData);
  }
}
