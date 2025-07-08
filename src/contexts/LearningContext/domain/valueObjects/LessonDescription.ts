import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface LessonDescriptionProps {
  [description: string]: string;
}

export class LessonDescription extends ValueObject<LessonDescriptionProps> {
  private constructor(props: LessonDescriptionProps) {
    super(props);
  }

  public get value(): string {
    return this.props.description;
  }

  public static create(props: LessonDescriptionProps): LessonDescription {
    if (typeof props.description !== "string")
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid description value");
    if (props.description.length < 30 || props.description.length > 1000)
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Description must be between 30 and 1000 characters long"
      );
    return new LessonDescription(props);
  }
}
