import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface RequestUpdatedAtProps {
  value: Date;
}

export class RequestUpdatedAt extends ValueObject<RequestUpdatedAtProps> {
  private constructor(props: RequestUpdatedAtProps) {
    super(props);
  }

  public get value(): Date {
    return this.props.value;
  }

  public static create(value: Date): RequestUpdatedAt {
    if (!value)
      throw new ApiError(StatusCodes.BAD_REQUEST, "UpdatedAt is required");
    return new RequestUpdatedAt({ value });
  }
}
