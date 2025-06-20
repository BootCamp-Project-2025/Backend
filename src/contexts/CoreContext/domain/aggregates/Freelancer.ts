import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { About } from "../valueObjects/About";
import { UserId } from "../valueObjects/UserId";
import { AggregateRoot } from "@/contexts/Shared/domain/AgregateRoot";
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

  get skills(): Skills {
    return this.props.skills;
  }

  get languages(): Languages {
    return this.props.languages;
  }

  get education(): Educations {
    return this.props.education;
  }

  get experience(): Experiences {
    return this.props.experience;
  }

  get certifications(): Certifications {
    return this.props.certifications;
  }

  public updateAbout(newAbout: About): void {
    this.props.about = newAbout;
  }
}
