import { Education } from "../entities/Education";
import { Experience } from "../entities/Experience";
import { Certification } from "../entities/Certification";
import { AggregateRoot } from "@/contexts/Shared/Domain/AgregateRoot";
import { LanguageCollection } from "../entities/LanguageCollection";
import { SkillCollection } from "../entities/SkillCollection";
import { UniqueEntityID } from "@/contexts/Shared/Domain/UniqueEntityID";
import { UserId } from "../entities/UserId";

interface FreelancerProps {
  id: UserId;
  fullName: string;
  about: string;
  skills: SkillCollection;
  languages: LanguageCollection;
  education: Education;
  experience: Experience;
  certifications: Certification;
}

export class Freelancer extends AggregateRoot<FreelancerProps> {
  private constructor(props: FreelancerProps, id?: UniqueEntityID) {
    super(props, id);
  }
  public static create(
    props: FreelancerProps,
    id?: UniqueEntityID
  ): Freelancer {
    if (!props.fullName || !props.about) {
      throw new Error("Full name and about are required."); //Metods of Result and Guard?
    }
    return new Freelancer(props, id); //Here we can add validation logic if needed and newUser logic
  }

  //The gets encapsulated logic of the aggregate avoiding to expose  this.props directly
  get profileId(): UniqueEntityID {
    return this._id;
  }

  get fullName(): string {
    return this.props.fullName;
  }

  get about(): string {
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
