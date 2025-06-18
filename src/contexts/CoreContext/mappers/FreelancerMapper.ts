import { Freelancer } from "../domain/aggregates/Freelancer";
import { Freelancer as PrismaFreelancer } from "@/generated/prisma";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { About } from "../domain/valueObjects/About";
import { UserId } from "../domain/valueObjects/UserId";
import { IFreelancerProfileDto } from "../domain/interfaces/dtos/IFreelancerProfileDto";
import { Skills } from "../domain/OneToMany/Skills";
import { Languages } from "../domain/OneToMany/Languages";
import { Educations } from "../domain/OneToMany/Educations";
import { Certifications } from "../domain/OneToMany/Certifications";
import { Experiences } from "../domain/OneToMany/Experiences";

export default class FreelancerMapper {
  static persistanceToDomain(
    userId: string,
    prismaFreelancer: PrismaFreelancer
  ): Freelancer {
    return Freelancer.create(
      {
        //create mappers from eities
        userId: UserId.create(new UniqueEntityID(userId)),
        about: About.create(prismaFreelancer.about),
        skills: Skills.create([]),
        languages: Languages.create([]),
        education: Educations.create([]),
        certifications: Certifications.create([]),
        experience: Experiences.create([]),
      },
      new UniqueEntityID(prismaFreelancer.id)
    );
  }

  static domainToFreelancerProfileDto(
    freelancer: Freelancer
  ): IFreelancerProfileDto {
    return {
      about: freelancer.about.value,
      skills: freelancer.skills.getItems(),
      languages: freelancer.languages.getItems(),
      education: freelancer.education.getItems(),
      experience: freelancer.experience.getItems(),
      certifications: freelancer.certifications.getItems(),
    };
  }
}
