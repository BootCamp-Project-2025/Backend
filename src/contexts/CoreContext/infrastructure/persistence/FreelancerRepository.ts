import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { Freelancer } from "../../domain/entities/Freelancer";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";
import { Skill } from "../../domain/valueObjects/Skill";
import SkillMapper from "../../mappers/SkillMapper";
import { injectable } from "tsyringe";
import prismaClient from "@/contexts/Shared/infrastrucutre/database/prismaClient";
import FreelancerMapper from "../../mappers/FreelancerMapper";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

@injectable()
export default class FreelancerRepository implements IFreelancerRepository {
  async editSkill(skillId: string, skill: Skill): Promise<Skill> {
    const skillDb = SkillMapper.domainToPersistance(skill);
    await PrismaClient.skill.update({
      where: {
        id: skillId,
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
    return SkillMapper.persistanceToDomain(skillDb);
  }
  async updateSkills(freelancerId: string, skills: Skill[]): Promise<Skill[]> {
    try {
      const skillsDb = SkillMapper.domainToPersistanceBulk(skills);
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
      return SkillMapper.persistanceToDomainBulk(freelancer[1].skills);
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
    return SkillMapper.persistanceToDomainBulk(skillsDB);
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
  async getById(userId: string): Promise<Freelancer | null> {
    const freelancerDb = await prismaClient.freelancer.findUniqueOrThrow({
      where: { userId: userId },
      include: {
        skills: true,
        certifications: true,
        experience: true,
        education: true,
      },
    });
    return FreelancerMapper.persistanceTodomain(userId, freelancerDb);
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
