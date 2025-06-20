import { ManyRelationship } from "@/contexts/Shared/domain/ManyRelationship";
import { Language } from "../entities/Language";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";

export class Languages extends ManyRelationship<Language> {
  private constructor(languages: Language[]) {
    super(languages);
  }

  compareItems(a: Language, b: Language): boolean {
    return a.equals(b);
  }

  public static create(languages: Language[]): Languages {
    return new Languages(languages);
  }

  public add(language: Language): void {
    if (!this.getItems().includes(language)) {
      super.add(language);
    }
  }

  public edit(editedLanguage: Language): void {
    const index = this.getItems().findIndex((language) =>
      language.id.equals(editedLanguage.id)
    );
    if (index === -1)
      throw new ApiError(StatusCodes.CONTINUE, "experience doesnt exist");
    super.edit(editedLanguage, index);
  }

  public remove(language: Language): void {
    super.remove(language);
  }
}
