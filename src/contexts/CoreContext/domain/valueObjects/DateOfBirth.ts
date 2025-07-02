import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface DateOfBirthProps {
  value: Date;
}

export class DateOfBirth extends ValueObject<DateOfBirthProps> {
  get value(): Date {
    return this.props.value;
  }

  private constructor(props: DateOfBirthProps) {
    super(props);
  }

  private static isValidDate(date: Date): boolean {
    const now = new Date();
    const min = new Date("1900-01-01");
    return date <= now && date >= min;
  }

  public static create(date: Date | null | undefined): DateOfBirth {
    if (!date) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Date of birth required");
    }

    if (!this.isValidDate(date)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid date of birth");
    }

    return new DateOfBirth({ value: date });
  }
}
