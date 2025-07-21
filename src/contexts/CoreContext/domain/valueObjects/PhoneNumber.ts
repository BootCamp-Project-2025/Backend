import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface PhoneNumberProps {
  value: string;
}

export class PhoneNumber extends ValueObject<PhoneNumberProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: PhoneNumberProps) {
    super(props);
  }

  private static isValidPhoneNumber(phone: string): boolean {
    const regex =
      /^(\+?\d{1,4}[\s.-]?)?(\(?\d{2,4}\)?[\s.-]?)?(\d{3,4}[\s.-]?\d{4})$/;
    return regex.test(phone);
  }

  public static create(phone: string): PhoneNumber {
    if (!phone) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Phone is Required");
    }

    if (!this.isValidPhoneNumber(phone)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Phone is not valid");
    }
    return new PhoneNumber({ value: phone });
  }
}
