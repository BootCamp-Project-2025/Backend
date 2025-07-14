import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface RequestDescriptionProps {
  value: string;
}

export class RequestDescription extends ValueObject<RequestDescriptionProps> {
  private constructor(props: RequestDescriptionProps) {
    super(props);
  }

  public get value(): string {
    return this.props.value;
  }

  public static create(value: string): RequestDescription {
    if (!value || value.trim().length === 0) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Description cannot be empty"
      );
    }

    if (value.length > 300) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Request description cannot exceed 300 characters"
      );
    }

    return new RequestDescription({ value });
  }

  public static default(): RequestDescription {
    return new RequestDescription({ value: "General description" });
  }
}
