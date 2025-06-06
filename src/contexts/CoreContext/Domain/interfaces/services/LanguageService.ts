import { Language } from "../../ValueObjects/Language";

export class LanguageService {
  private languages: Language[];

  private constructor(languages: Language[]) {
    this.languages = languages;
  }

  public static create(languages: Language[]): LanguageService {
    return new LanguageService(languages);
  }

  public add(language: Language): void {
    if (!this.languages.includes(language)) {
      this.languages.push(language);
    }
  }

  public remove(language: Language): void {
    this.languages = this.languages.filter((l) => l !== language);
  }

  public getAll(): Language[] {
    return [...this.languages];
  }

  public count(): number {
    return this.languages.length;
  }
}
