import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface SyllabusSectionTitleProps {
  [title: string]: string;
}

export class SyllabusSectionTitle extends ValueObject<SyllabusSectionTitleProps> {
  private constructor(props: SyllabusSectionTitleProps) {
    super(props);
  }

  public get value(): string {
    return this.props.title;
  }

  public static create(props: SyllabusSectionTitleProps): SyllabusSectionTitle {
    if (!props.title || typeof props.title !== "string") {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid title value");
    }
    if (props.title.length < 5 || props.title.length > 20)
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Title must be between 5 and 20 characters long"
      );
    return new SyllabusSectionTitle(props);
  }
}
