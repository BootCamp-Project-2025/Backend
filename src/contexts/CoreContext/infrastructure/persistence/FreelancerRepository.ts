import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { Freelancer } from "../../domain/aggregates/Freelancer";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";
import { Skill } from "../../domain/entities/Skill";
import { skillMapper } from "../../mappers/SkillMapper";
import { injectable } from "tsyringe";
import FreelancerMapper from "../../mappers/FreelancerMapper";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { FreelancerDao } from "../../domain/interfaces/dao/FreelancerDao";

@injectable()
export default class FreelancerRepository implements IFreelancerRepository {
  async editSkill(freelancerId: string, skill: Skill): Promise<Skill> {
    const skillDb = skillMapper.mapDomainToPersistance(skill);
    await PrismaClient.skill.update({
      where: {
        id: skill.id.toString(),
      },
      data: { level: skillDb.level },
    });
    return skill;
  }
  async deleteSkill(skillId: string): Promise<Skill> {
    const skillDb = await PrismaClient.skill.delete({
      where: {
        id: skillId,
      },
    });
    return skillMapper.mapPersistanceToDomain(skillDb);
  }
  async updateSkills(freelancerId: string, skills: Skill[]): Promise<Skill[]> {
    try {
      const skillsDb = skillMapper.mapArrayDomainToPersistance(skills);
      const freelancer = await PrismaClient.$transaction([
        PrismaClient.skill.deleteMany({
          where: { freelancerId: freelancerId },
        }),
        PrismaClient.freelancer.update({
          where: { id: freelancerId },
          data: {
            skills: {
              create: skillsDb,
            },
          },
          include: { skills: true },
        }),
      ]);
      return skillMapper.mapArrayPersistanceToDomain(freelancer[1].skills);
    } catch (error) {
      console.log(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "there was an error"
      );
    }
  }
  async getSkills(freelancerId: string): Promise<Skill[]> {
    const skillsDB = await PrismaClient.skill.findMany({
      where: { freelancerId: freelancerId },
    });
    return skillMapper.mapArrayPersistanceToDomain(skillsDB);
  }
  async getSkillId(
    freelancerId: string,
    skill: Skill
  ): Promise<string | undefined> {
    const skillDb = await PrismaClient.skill.findFirst({
      where: {
        freelancerId: freelancerId,
        name: skill.name,
      },
    });
    return skillDb?.id;
  }
  getAll(): Promise<Freelancer[]> {
    throw new Error("Method not implemented.");
  }
  async getById(id: string): Promise<Freelancer> {
    try {
      const freelancerDb: FreelancerDao | null =
        await PrismaClient.freelancer.findUnique({
          where: { id: id },
          include: {
            certifications: true,
            experience: true,
            skills: true,
            education: true,
            languages: true,
          },
        });
      if (freelancerDb !== null)
        return FreelancerMapper.persistanceToDomain(freelancerDb);
      else
        throw new ApiError(
          StatusCodes.NOT_FOUND,
          "freelancer profile not found"
        );
    } catch (error) {
      console.log(error);
      throw new Error("database error");
    }
  }
  delete(): Promise<string | void> {
    throw new Error("Method not implemented.");
  }
  create(): Promise<Freelancer> {
    throw new Error("Method not implemented.");
  }
  update(): Promise<Freelancer> {
    throw new Error("Method not implemented.");
  }
}
