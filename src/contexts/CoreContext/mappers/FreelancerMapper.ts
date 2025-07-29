import { Freelancer } from "../domain/aggregates/Freelancer";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { IFreelancerProfileDto } from "../domain/interfaces/dtos/IFreelancerProfileDto";
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
  static manyDomainToDto(freelancers: Freelancer[]): IFreelancerProfileDto[] {
    return freelancers.map((freelancer) => {
      return this.domainToDto(freelancer);
    });
  }

  static domainToDto(freelancer: Freelancer): IFreelancerProfileDto {
    return {
      id: freelancer.id.toString(),
      certifications: freelancer.certifications.currentItems.map((cert) => {
        return new CertificationMapper().mapDomainToDto(cert);
      }),
      education: freelancer.education.currentItems.map((edu) => {
        return new EducationMapper().mapDomainToDto(edu);
      }),
      experience: freelancer.experience.currentItems.map((exp) => {
        return new ExperienceMapper().mapDomainToDto(exp);
      }),
      languages: freelancer.languages.currentItems.map((lang) => {
        return LanguageMapper.domaintToDto(lang);
      }),
      skills: new SkillMapper().mapArrayDomainToDto(
        freelancer.skills.currentItems
      ),
    };
  }

  static manyPersistanceToDomain(
    prismaFreelancers: FreelancerDao[]
  ): Freelancer[] {
    return prismaFreelancers.map((freelancer) => {
      return this.persistanceToDomain(freelancer);
    });
  }

  static persistanceToDomain(prismaFreelancer: FreelancerDao): Freelancer {
    return Freelancer.create(
      {
        //create mappers from eities
        userId: UserId.create(new UniqueEntityID(prismaFreelancer.userId)),
        skills: Skills.create(
          new SkillMapper().mapArrayPersistanceToDomain(prismaFreelancer.skills)
        ),
        languages: Languages.create(
          new LanguageMapper().mapArrayPersistanceToDomain(
            prismaFreelancer.languages
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
}
