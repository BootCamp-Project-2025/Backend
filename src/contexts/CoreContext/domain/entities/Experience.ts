import { Entity } from "@/contexts/Shared/domain/Entity";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

interface ExperienceProps {
  position: string;
  employer: string;
  country: string;
  startDate: Date;
  endDate: Date;
  description: string;
}

export class Experience extends Entity<ExperienceProps> {
  private constructor(props: ExperienceProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: ExperienceProps,
    id?: UniqueEntityID
  ): Experience {
    if (!props.position || !props.employer || !props.country) {
      throw new Error("Position, employer and country are required.");
    }
    return new Experience(props, id);
  }

  get experienceId(): UniqueEntityID {
    return this._id;
  }

  get position(): string {
    return this.props.position;
  }

  get employer(): string {
    return this.props.employer;
  }

  get country(): string {
    return this.props.country;
  }

  get startDate(): Date {
    return this.props.startDate;
  }

  get endDate(): Date {
    return this.props.endDate;
  }

  get description(): string {
    return this.props.description;
  }
}
