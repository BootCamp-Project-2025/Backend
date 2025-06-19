import { Skill } from "../domain/entities/Skill";
import { $Enums, Skill as PrismaSkill } from "@/generated/prisma";
import { ArrayToArrayMapper } from "./ArrayToArrayMapper";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

export class SkillMapper extends ArrayToArrayMapper<Skill, PrismaSkill> {
  mapDomainToPersistance(origin: Skill): {
    name: string;
    id: string;
    level: $Enums.SkillLevel;
    freelancerId: string;
  } {
    console.log(origin);
    throw new Error("Method not implemented.");
  }
  mapPersistanceToDomain(origin: {
    name: string;
    id: string;
    level: $Enums.SkillLevel;
    freelancerId: string;
  }): Skill {
    return Skill.create(origin, new UniqueEntityID(origin.id));
  }
}

export const skillMapper = new SkillMapper();
