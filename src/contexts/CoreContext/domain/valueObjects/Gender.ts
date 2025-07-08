import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface GenderProps {
  value: string;
}

export class Gender extends ValueObject<GenderProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: GenderProps) {
    super(props);
  }

  private static isValid(value: string): boolean {
    const validGenders = ["male", "female", "other"];
    return validGenders.includes(value);
  }

  public static create(value: string): Gender {
    if (!value) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Gender is required");
    }

    if (!this.isValid(value)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Gender");
    }

    return new Gender({ value });
  }
}
