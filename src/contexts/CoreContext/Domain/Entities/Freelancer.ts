import { UniqueEntityID } from "@/contexts/Shared/Domain/UniqueEntityID";
import { Entity } from "@/contexts/Shared/Domain/Entity";
import { About } from "../ValueObjects/About";
import { Language } from "../ValueObjects/Language";
import { Skill } from "../ValueObjects/Skill";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { Certification } from "../ValueObjects/Certification";
import { UserId } from "../ValueObjects/UserId";

interface FreelancerProps {
  userId: UserId;
  about: About;
  skills: Skill[];
  languages: Language[];
  education: Education[];
  experience: Experience[];
  certifications: Certification[];
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

  get skills(): Skill[] {
    return this.props.skills;
  }

  get languages(): Language[] {
    return this.props.languages;
  }

  get education(): Education[] {
    return this.props.education;
  }

  get experience(): Experience[] {
    return this.props.experience;
  }

  get certifications(): Certification[] {
    return this.props.certifications;
  }
}
