import { Experience as PrismaExperience } from "@/generated/prisma";
import { ArrayToArrayMapper } from "./ArrayToArrayMapper";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Experience } from "../domain/entities/Experience";

export class ExperienceMapper extends ArrayToArrayMapper<
  Experience,
  PrismaExperience
> {
  mapDomainToPersistance(origin: Experience): {
    id: string;
    startDate: Date;
    endDate: Date;
    freelancerId: string;
    position: string;
    employer: string;
    country: string;
    description: string;
  } {
    console.log(origin);
    throw new Error("Method not implemented.");
  }
  mapPersistanceToDomain(origin: {
    id: string;
    position: string;
    employer: string;
    country: string;
    description: string;
    startDate: Date;
    endDate: Date;
    freelancerId: string;
  }): Experience {
    return Experience.create(origin, new UniqueEntityID(origin.id));
  }
}
