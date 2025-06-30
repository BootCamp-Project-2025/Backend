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
    if (date > new Date()) return false;
    if (date < new Date("1/1/1990")) return false;
    return true;
  }

  public static create(date: Date): DateOfBirth {
    if (!date) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Date of birth required");
    }

    if (!this.isValidDate) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid date of birth");
    }

    return new DateOfBirth({ value: date });
  }
}
