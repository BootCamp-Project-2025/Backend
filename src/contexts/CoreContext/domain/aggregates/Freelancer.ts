import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { About } from "../valueObjects/About";
import { Language } from "../valueObjects/Language";
import { Skill } from "../valueObjects/Skill";
import { Education } from "../entities/Education";
import { Experience } from "../entities/Experience";
import { Certification } from "../valueObjects/Certification";
import { UserId } from "../valueObjects/UserId";
import { AggregateRoot } from "@/contexts/Shared/domain/AgregateRoot";

interface FreelancerProps {
  userId: UserId;
  about: About;
  skills: Skill[];
  languages: Language[];
  education: Education[];
  experience: Experience[];
  certifications: Certification[];
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
