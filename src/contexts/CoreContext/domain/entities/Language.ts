import { Entity } from "@/contexts/Shared/domain/Entity";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

interface LanguageProps {
  name: string;
  level: "basic" | "intermediate" | "advanced" | "native";
}

export class Language extends Entity<LanguageProps> {
  constructor(props: LanguageProps, id: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: LanguageProps, id: UniqueEntityID): Language {
    if (!props.name || !props.level) {
      throw new Error("Language must have a name and level");
    }
    return new Language(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
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
