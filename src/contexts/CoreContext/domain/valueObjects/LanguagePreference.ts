import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import ISO6391 from "iso-639-1";

interface LanguagePreferenceProps {
  value: string;
}

export class LanguagePreference extends ValueObject<LanguagePreferenceProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: LanguagePreferenceProps) {
    super(props);
  }

  private static isValid(value: string): boolean {
    return ISO6391.getAllNames()
      .map((name) => name.toLowerCase())
      .includes(value.toLowerCase());
  }

  public static create(value: string): LanguagePreference {
    if (!value) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "LanguagePreference is required"
      );
    }

    if (!this.isValid(value)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid LanguagePreference");
    }

    return new LanguagePreference({ value });
  }
}
