import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

interface CountryProps {
  value: string;
}

export class Country extends ValueObject<CountryProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: CountryProps) {
    super(props);
  }

  private static isValid(value: string): boolean {
    return countries.isValid(value);
  }

  public static create(value: string): Country {
    if (!value) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Country is required");
    }

    if (!this.isValid(value)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Country");
    }

    return new Country({ value });
  }
}
