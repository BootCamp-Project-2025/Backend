import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface CreationDateProps {
  value: Date;
}

export class CreationDate extends ValueObject<CreationDateProps> {
  get value(): Date {
    return this.props.value;
  }

  private constructor(props: CreationDateProps) {
    super(props);
  }

  private static isValidDate(date: Date): boolean {
    const now = new Date();
    return date <= now;
  }

  public static create(date: Date | null | undefined): CreationDate {
    if (!date) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Creation date required");
    }

    if (!this.isValidDate(date)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid creation date");
    }

    return new CreationDate({ value: date });
  }
}
