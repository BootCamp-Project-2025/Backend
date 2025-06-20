import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Experience as PrismaExperience } from "@/generated/prisma";
import { Experience } from "../domain/entities/Experience";
import { ExperienceDTO } from "../domain/interfaces/dtos/IExperienceDto";

export default class ExperienceMapper {
  static persistenceToDomain(experience: PrismaExperience): Experience {
    return Experience.create(
      {
        position: experience.position,
        employer: experience.employer,
        country: experience.country,
        startDate: experience.startDate,
        endDate: experience.endDate,
        description: experience.description,
      },
      new UniqueEntityID(experience.id)
    );
  }

  static dtoToDomain(experience: ExperienceDTO, id?: string): Experience {
    return Experience.create(
      {
        position: experience.position,
        employer: experience.employer,
        country: experience.country,
        startDate: experience.startDate,
        endDate: experience.endDate,
        description: experience.description,
      },
      id ? new UniqueEntityID(id) : new UniqueEntityID()
    );
  }

  static domainToDto(experience: Experience): ExperienceDTO {
    return {
      id: experience.id.toString(),
      position: experience.position,
      employer: experience.employer,
      country: experience.country,
      startDate: experience.startDate,
      endDate: experience.endDate,
      description: experience.description,
    };
  }

  static toPersistence(
    experience: Experience,
    freelancerId: string
  ): PrismaExperience {
    return {
      id: experience.id.toString(),
      position: experience.position,
      employer: experience.employer,
      country: experience.country,
      startDate: experience.startDate,
      endDate: experience.endDate,
      description: experience.description,
      freelancerId,
    };
  }
}
