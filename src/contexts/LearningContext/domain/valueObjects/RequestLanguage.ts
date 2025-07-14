import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface LanguageProps {
  value: string;
}

const allowedLanguages = ["EN", "ES"];

export class RequestLanguage extends ValueObject<LanguageProps> {
  private constructor(props: LanguageProps) {
    super(props);
  }

  public get value(): string {
    return this.props.value;
  }

  public static create(value: string): RequestLanguage {
    const upper = value.toUpperCase();
    if (!allowedLanguages.includes(upper)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Usupported language");
    }

    return new RequestLanguage({ value: upper });
  }
}
