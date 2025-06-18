import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

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

  get id(): UniqueEntityID {
    return this.id;
  }

  get name(): string {
    return this.props.name;
  }

  public editLevel(level: "basic" | "intermediate" | "advanced" | "native") {
    this.props.level = level;
  }

  get level(): LanguageProps["level"] {
    return this.props.level;
  }

  public toString(): string {
    return `${this.props.name} (${this.props.level})`;
  }
}
