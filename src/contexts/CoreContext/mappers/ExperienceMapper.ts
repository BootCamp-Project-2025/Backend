import { Experience as PrismaExperience } from "@/generated/prisma";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ArrayToArrayMapper } from "./ArrayToArrayMapper";
import { IExperienceDTO } from "../domain/interfaces/dtos/IExperienceDto";
import { Experience } from "../domain/entities/Experience";

export class ExperienceMapper extends ArrayToArrayMapper<
  Experience,
  PrismaExperience
> {
  mapPersistanceToDomain(origin: PrismaExperience): Experience {
    return Experience.create(
      {
        position: origin.position,
        employer: origin.employer,
        country: origin.country,
        startDate: new Date(origin.startDate),
        endDate: new Date(origin.endDate),
        description: origin.description,
        freelancerId: origin.freelancerId,
      },
      new UniqueEntityID(origin.id)
    );
  }

  mapDomainToPersistance(origin: Experience): PrismaExperience {
    return {
      id: origin.id.toString(),
      position: origin.position,
      employer: origin.employer,
      country: origin.country,
      startDate: origin.startDate,
      endDate: origin.endDate,
      description: origin.description,
      freelancerId: origin.freelancerId ?? "",
    };
  }

  mapDomainToDto(domain: Experience): IExperienceDTO {
    return {
      id: domain.id.toString(),
      position: domain.position,
      employer: domain.employer,
      country: domain.country,
      startDate: domain.startDate,
      endDate: domain.endDate,
      description: domain.description,
      freelancerId: domain.freelancerId ?? "",
    };
  }

  mapDtoToDomain(dto: IExperienceDTO): Experience {
    return Experience.create(
      {
        position: dto.position,
        employer: dto.employer,
        country: dto.country,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        description: dto.description,
        freelancerId: dto.freelancerId ?? "",
      },
      dto.id ? new UniqueEntityID(dto.id) : undefined
    );
  }
}
