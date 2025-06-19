import { Skill as PrismaSkill } from "@/generated/prisma";
import { Skill } from "../domain/valueObjects/Skill";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import ISkillDto from "../domain/interfaces/dtos/ISkillDto";

type PrismaSave = {
  name: string;
  id: string;
  level: "beginner" | "intermediate" | "advanced";
};

export default class SkillMapper {
  static dtoToDomain(body: ISkillDto): Skill {
    return new Skill({ name: body.name, level: body.level });
  }
  static persistanceToDomain(prismaSkill: PrismaSkill): Skill {
    return new Skill({ name: prismaSkill.name, level: prismaSkill.level });
  }

  static persistanceToDomainBulk(prismaSkills: PrismaSkill[]): Skill[] {
    return prismaSkills.map((prismaSkill: PrismaSkill) =>
      this.persistanceToDomain(prismaSkill)
    );
  }
  static domainToPersistance(skill: Skill): PrismaSave {
    return {
      name: skill.name,
      level: skill.level,
      id: new UniqueEntityID().toString(),
    };
  }

  static domainToPersistanceBulk(skills: Skill[]): PrismaSave[] {
    return skills.map((skill: Skill) => this.domainToPersistance(skill));
  }
}
