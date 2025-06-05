import { SkillCollection } from "./SkillCollection";
import { LanguageCollection } from "./LanguageCollection";
import { EducationCollection } from "../collections/EducationCollection";
import { ExperienceCollection } from "../collections/ExperienceCollection";
import { CertificationCollection } from "../collections/CertificationCollection";
import { UniqueEntityID } from "@/contexts/Shared/Domain/UniqueEntityID";
import { Entity } from "@/contexts/Shared/Domain/Entity";
import { About } from "../valueObjects/About";
import { UserId } from "../valueObjects/UserId";

interface FreelancerProps {
  userId: UserId; //Relation with AggregateRoot User
  about: About;
  skills: SkillCollection;
  languages: LanguageCollection;
  education: EducationCollection;
  experience: ExperienceCollection;
  certifications: CertificationCollection;
}
export class Freelancer extends Entity<FreelancerProps> {
  private constructor(props: FreelancerProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: FreelancerProps,
    id?: UniqueEntityID
  ): Freelancer {
    if (!props.about) {
      throw new Error("About is required.");
    }

    return new Freelancer(props, id);
  }

  get freelancerId(): UniqueEntityID {
    return this._id;
  }

  get userId(): UserId {
    return this.props.userId;
  }

  get about(): About {
    return this.props.about;
  }

  get skills(): SkillCollection {
    return this.props.skills;
  }

  get languages(): LanguageCollection {
    return this.props.languages;
  }

  get education(): EducationCollection {
    return this.props.education;
  }

  get experience(): ExperienceCollection {
    return this.props.experience;
  }

  get certifications(): CertificationCollection {
    return this.props.certifications;
  }

  //Domain events can be added here if needed like addSkill, addLanguage, etc.
}

// FreelancerProfile (AR)
// ├── freelancerId: UUID
// ├── userId: UUID (reference to User)
// ├── skills, education, experience etc
