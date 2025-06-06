import { ValueObject } from "@/contexts/Shared/Domain/ValueObject";

interface LanguageProps {
  name: string;
  level: "basic" | "intermediate" | "advanced" | "native";
}

export class Language extends ValueObject<LanguageProps> {
  constructor(props: LanguageProps) {
    super(props);
  }

  public static create(props: LanguageProps): Language {
    if (!props.name || !props.level) {
      throw new Error("Language must have a name and level");
    }
    return new Language(props);
  }

  get name(): string {
    return this.props.name;
  }

  get level(): LanguageProps["level"] {
    return this.props.level;
  }

  public toString(): string {
    return `${this.props.name} (${this.props.level})`;
  }
}
