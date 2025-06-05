import { ValueObject } from "@/contexts/Shared/Domain/ValueObject";
import { Language } from "../valueObjects/Language";

interface LanguageCollectionProps {
  languages: Language[];
}

export class LanguageCollection extends ValueObject<LanguageCollectionProps> {
  private constructor(props: LanguageCollectionProps) {
    super(props);
  }

  public static create(props: LanguageCollectionProps): LanguageCollection {
    return new LanguageCollection(props);
  }

  public add(language: Language): void {
    const exists = this.props.languages.some((l) => l.equals(language));
    if (!exists) {
      this.props.languages.push(language);
    }
  }

  public remove(language: Language): void {
    this.props.languages = this.props.languages.filter(
      (l) => !l.equals(language)
    );
  }

  public getAll(): Language[] {
    return [...this.props.languages];
  }

  public count(): number {
    return this.props.languages.length;
  }
}

//A value object may contain other value objects
