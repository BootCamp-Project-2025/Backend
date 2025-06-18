import { Education as PrismaEducation } from "@/generated/prisma";
import { ArrayToArrayMapper } from "./ArrayToArrayMapper";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Education } from "../domain/entities/Education";

export class EducationMapper extends ArrayToArrayMapper<
  Education,
  PrismaEducation
> {
  mapDomainToPersistance(origin: Education): {
    id: string;
    freelancerId: string;
    career: string;
    university: string;
    startDate: Date;
    endDate: Date;
  } {
    throw new Error("Method not implemented.");
  }
  mapPersistanceToDomain(origin: {
    id: string;
    career: string;
    university: string;
    startDate: Date;
    endDate: Date;
    freelancerId: string;
  }): Education {
    return Education.create(
      { ...origin, finishDate: origin.endDate },
      new UniqueEntityID(origin.id)
    );
  }
}
