import { Education } from "../domain/entities/Education";
import { IEducationDto } from "../domain/interfaces/dtos/IEducationDto";
import { Education as PrismaEducation } from "@/generated/prisma";

export class EducationMapper {
  static dtoToDomain(educationDto: IEducationDto): Education {
    return Education.create({
      career: educationDto.career,
      university: educationDto.university,
      startDate: educationDto.startDate,
      finishDate: educationDto.finishDate,
    });
  }

  static domainToDto(educationDomain: Education): IEducationDto {
    return {
      id: educationDomain.educationId,
      career: educationDomain.career,
      university: educationDomain.university,
      startDate: educationDomain.startDate,
      finishDate: educationDomain.finishDate,
    };
  }

  static domainToPersistence(
    educationDomain: Education,
    freelancerId: string = ""
  ): PrismaEducation {
    return {
      id: educationDomain.educationId,
      career: educationDomain.career,
      university: educationDomain.university,
      startDate: educationDomain.startDate,
      endDate: educationDomain.finishDate,
      freelancerId: freelancerId,
    };
  }

  static persistenceToDomain(prismaEducation: PrismaEducation): Education {
    return Education.create({
      career: prismaEducation.career,
      university: prismaEducation.university,
      startDate: prismaEducation.startDate,
      finishDate: prismaEducation.endDate,
    });
  }
}
