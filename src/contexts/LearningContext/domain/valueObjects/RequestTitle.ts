import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface RequestTitleProps {
  value: string;
}

export class RequestTitle extends ValueObject<RequestTitleProps> {
  private constructor(props: RequestTitleProps) {
    super(props);
  }

  public get value(): string {
    return this.props.value;
  }

  public static create(value: string): RequestTitle {
    if (!value || value.trim().length === 0) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Title cannot be empty");
    }

    if (value.length > 100) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Request title cannot exceed 100 characters"
      );
    }

    return new RequestTitle({ value });
  }

  public static default(): RequestTitle {
    return new RequestTitle({ value: "General Request" });
  }
}
