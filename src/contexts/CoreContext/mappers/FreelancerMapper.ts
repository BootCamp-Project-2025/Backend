import { Freelancer } from "../domain/aggregates/Freelancer";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Freelancer as PrismaFreelancer } from "@/generated/prisma";
import { IFreelancerProfileDto } from "../domain/interfaces/dtos/IFreelancerProfileDto";
import { About } from "../domain/valueObjects/About";
import { UserId } from "../domain/valueObjects/UserId";
import { Skills } from "../domain/OneToMany/Skills";
import { Languages } from "../domain/OneToMany/Languages";
import { Educations } from "../domain/OneToMany/Educations";
import { Certifications } from "../domain/OneToMany/Certifications";
import { Experiences } from "../domain/OneToMany/Experiences";
import { FreelancerDao } from "../domain/interfaces/dao/FreelancerDao";
import { SkillMapper } from "./SkillMapper";
import { LanguageMapper } from "./LanguageMapper";
import { EducationMapper } from "./EducationMapper";
import { CertificationMapper } from "./CertificationMapper";
import { ExperienceMapper } from "./ExperienceMapper";

export default class FreelancerMapper {
  static persistanceToDomain(prismaFreelancer: FreelancerDao): Freelancer {
    return Freelancer.create(
      {
        //create mappers from eities
        userId: UserId.create(new UniqueEntityID(prismaFreelancer.userId)),
        about: About.create(prismaFreelancer.about),
        skills: Skills.create(
          new SkillMapper().mapArrayPersistanceToDomain(prismaFreelancer.skills)
        ),
        languages: Languages.create(
          new LanguageMapper().mapArrayPersistanceToDomain(
            prismaFreelancer.skills
          )
        ),
        education: Educations.create(
          new EducationMapper().mapArrayPersistanceToDomain(
            prismaFreelancer.education
          )
        ),
        certifications: Certifications.create(
          new CertificationMapper().mapArrayPersistanceToDomain(
            prismaFreelancer.certifications
          )
        ),
        experience: Experiences.create(
          new ExperienceMapper().mapArrayPersistanceToDomain(
            prismaFreelancer.experience
          )
        ),
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
