import { Freelancer } from "../domain/entities/Freelancer";
import { Freelancer as PrismaFreelancer } from "@/generated/prisma";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { About } from "../domain/valueObjects/About";
import { UserId } from "../domain/valueObjects/UserId";
import { IFreelancerProfileDto } from "../domain/interfaces/dtos/IFreelancerProfileDto";

export default class FreelancerMapper {
  static persistanceTodomain(
    userId: string,
    prismaFreelancer: PrismaFreelancer
  ): Freelancer {
    return Freelancer.create(
      {
        userId: UserId.create(new UniqueEntityID(userId)),
        about: About.create(prismaFreelancer.about),
        skills: [],
        languages: [],
        education: [],
        certifications: [],
        experience: [],
      },
      new UniqueEntityID(prismaFreelancer.id)
    );
  }

  static domainToFreelancerProfileDto(
    freelancer: Freelancer
  ): IFreelancerProfileDto {
    return {
      about: freelancer.about.value,
      skills: freelancer.skills,
      languages: freelancer.languages,
      education: freelancer.education,
      experience: freelancer.experience,
      certifications: freelancer.certifications,
    };
  }
}
