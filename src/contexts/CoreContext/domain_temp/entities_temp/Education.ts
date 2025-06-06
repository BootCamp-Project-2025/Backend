import { Entity } from "@/contexts/Shared/Domain/Entity";
import { UniqueEntityID } from "@/contexts/Shared/Domain/UniqueEntityID";

interface EducationProps {
  career: string;
  university: string;
  startDate: Date;
  finishDate: Date;
}

export class Education extends Entity<EducationProps> {
  private constructor(props: EducationProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: EducationProps, id?: UniqueEntityID): Education {
    if (!props.career || !props.university) {
      throw new Error("Career name and university name are required.");
    }

    if (props.finishDate < props.startDate) {
      throw new Error("Finish date cannot be earlier than start date.");
    }

    return new Education(props, id);
  }

  get educationId(): string {
    return this._id.toString();
  }

  get career(): string {
    return this.props.career;
  }

  get university(): string {
    return this.props.university;
  }

  get startDate(): Date {
    return this.props.startDate;
  }

  get finishDate(): Date {
    return this.props.finishDate;
  }
}
