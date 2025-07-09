import { Education as PrismaEducation } from "@/generated/prisma";
import { ArrayToArrayMapper } from "./ArrayToArrayMapper";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Education } from "../domain/entities/Education";
import { IEducationDto } from "../domain/interfaces/dtos/IEducationDto";

export class EducationMapper extends ArrayToArrayMapper<
  Education,
  PrismaEducation
> {
  mapDtoToDomain(origin: IEducationDto): Education {
    return Education.create(
      {
        career: origin.career,
        university: origin.university,
        startDate: origin.startDate,
        finishDate: origin.finishDate,
        freelancerId: origin.freelancerId ?? "",
      },
      origin.id ? new UniqueEntityID(origin.id) : undefined
    );
  }

  mapMannyDtoToDomain(origin: IEducationDto[]): Education[] {
    return origin.map((e) => this.mapDtoToDomain(e));
  }

  mapMannyDomainToDto(origin: Education[]): IEducationDto[] {
    return origin.map((e) => this.mapDomainToDto(e));
  }

  mapDomainToDto(origin: Education): IEducationDto {
    return {
      id: origin.id.toString(),
      career: origin.career,
      university: origin.university,
      startDate: origin.startDate,
      finishDate: origin.finishDate,
    };
  }

  mapDomainToPersistance(origin: Education): {
    id: string;
    freelancerId: string;
    career: string;
    university: string;
    startDate: Date;
    endDate: Date;
  } {
    return {
      id: origin.id?.toString() ?? "",
      freelancerId: origin.freelancerId ?? "",
      career: origin.career,
      university: origin.university,
      startDate: new Date(origin.startDate),
      endDate: new Date(origin.finishDate),
    };
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
      {
        ...origin,
        startDate: new Date(origin.startDate),
        finishDate: new Date(origin.endDate),
      },
      new UniqueEntityID(origin.id)
    );
  }
}

export const educationMapper = new EducationMapper();
