import { Entity } from "@/contexts/Shared/domain/Entity";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

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
    const errors: string[] = [];

    if (!props.position || typeof props.position !== "string") {
      errors.push("Position must be a non-empty string.");
    }

    if (!props.employer || typeof props.employer !== "string") {
      errors.push("Employer must be a non-empty string.");
    }

    if (!props.country || typeof props.country !== "string") {
      errors.push("Country must be a non-empty string.");
    }

    if (
      !(props.startDate instanceof Date) ||
      isNaN(props.startDate.getTime())
    ) {
      errors.push("Start date must be a valid Date object.");
    }

    if (!(props.endDate instanceof Date) || isNaN(props.endDate.getTime())) {
      errors.push("End date must be a valid Date object.");
    }

    if (!props.description || typeof props.description !== "string") {
      errors.push("Description must be a non-empty string.");
    }

    if (errors.length > 0) {
      throw new ApiError(StatusCodes.BAD_REQUEST, errors.join(" "));
    }

    return new Experience(props, id);
  }

  get id(): UniqueEntityID {
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
