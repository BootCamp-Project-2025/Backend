import { Education } from "./Education";
import { Experience } from "./Experience";
import { Certification } from "./Certification";
import { LanguageCollection } from "./LanguageCollection";
import { SkillCollection } from "./SkillCollection";
import { UniqueEntityID } from "@/contexts/Shared/Domain/UniqueEntityID";
import { UserId } from "../valueObjects/UserId";
import { About } from "../valueObjects/About";
import { Entity } from "@/contexts/Shared/Domain/Entity";

interface FreelancerProps {
  userId: UserId; //Relation with AggregateRoot User
  fullName: string;
  about: About;
  skills: SkillCollection;
  languages: LanguageCollection;
  education: Education;
  experience: Experience;
  certifications: Certification;
}

export class Freelancer extends Entity<FreelancerProps> {
  private constructor(props: FreelancerProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: FreelancerProps,
    id?: UniqueEntityID
  ): Freelancer {
    if (!props.fullName || !props.about) {
      throw new Error("Full name and about are required.");
    }
    return new Freelancer(props, id);
  }

  //The gets encapsulated logic of the aggregate avoiding to expose  this.props directly
  get freelancerId(): UniqueEntityID {
    return this._id;
  }

  get userId(): UserId {
    return this.props.userId;
  }

  get fullName(): string {
    return this.props.fullName;
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

  get education(): Education {
    return this.props.education;
  }

  get experience(): Experience {
    return this.props.experience;
  }

  get certifications(): Certification {
    return this.props.certifications;
  }

  //Domain events can be added here if needed like addSkill, addLanguage, etc.
}

//Already can do:
//  freelancerProfile.props.languages.add(Language.create({ name: "Spanish", level: "native" }));

// FreelancerProfile (AR)
// ├── freelancerId: UUID
// ├── userId: UUID (referencia al User)
// ├── skills, education, experience
