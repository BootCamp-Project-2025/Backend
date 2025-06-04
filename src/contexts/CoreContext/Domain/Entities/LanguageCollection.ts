import { Entity } from "@/contexts/Shared/Domain/Entity";
import { UniqueEntityID } from "@/contexts/Shared/Domain/UniqueEntityID";
import { Language } from "../valueObjects/Language";

interface LanguageCollectionProps {
  languages: Language[];
}

export class LanguageCollection extends Entity<LanguageCollectionProps> {
  private constructor(props: LanguageCollectionProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: LanguageCollectionProps,
    id?: UniqueEntityID
  ): LanguageCollection {
    return new LanguageCollection(props, id);
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
