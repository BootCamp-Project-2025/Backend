import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface RequestCreationAt {
  value: Date;
}

export class RequestCreatedAt extends ValueObject<RequestCreationAt> {
  private constructor(props: RequestCreationAt) {
    super(props);
  }

  public get value(): Date {
    return this.props.value;
  }

  public static create(value: Date): RequestCreatedAt {
    if (!value)
      throw new ApiError(StatusCodes.BAD_REQUEST, "CreatedAt is required");
    return new RequestCreatedAt({ value });
  }
}
