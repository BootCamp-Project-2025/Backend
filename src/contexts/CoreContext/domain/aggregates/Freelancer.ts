import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { About } from "../valueObjects/About";
import { Language } from "../entities/Language";
import { Education } from "../entities/Education";
import { Experience } from "../entities/Experience";
import { Certification } from "../entities/Certification";
import { UserId } from "../valueObjects/UserId";
import { AggregateRoot } from "@/contexts/Shared/domain/AgregateRoot";
import { Skill } from "../entities/Skill";
import { Languages } from "../OneToMany/Languages";
import { Educations } from "../OneToMany/Educations";
import { Experiences } from "../OneToMany/Experiences";
import { Certifications } from "../OneToMany/Certifications";
import { Skills } from "../OneToMany/Skills";

interface FreelancerProps {
  userId: UserId;
  about: About;
  skills: Skills;
  languages: Languages;
  education: Educations;
  experience: Experiences;
  certifications: Certifications;
}
export class Freelancer extends AggregateRoot<FreelancerProps> {
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

  get skills(): Skill[] {
    return this.props.skills.getItems();
  }

  get languages(): Language[] {
    return this.props.languages.getItems();
  }

  get education(): Education[] {
    return this.props.education.getItems();
  }

  get experience(): Experience[] {
    return this.props.experience.getItems();
  }

  get certifications(): Certification[] {
    return this.props.certifications.getItems();
  }
}
