import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

interface LanguageProps {
  value: string;
}

export class RequestLanguage extends ValueObject<LanguageProps> {
  private constructor(props: LanguageProps) {
    super(props);
  }

  public get value(): string {
    return this.props.value;
  }

  public static create(value: string): RequestLanguage {
    const upper = value.toUpperCase();
    return new RequestLanguage({ value: upper });
  }
}
