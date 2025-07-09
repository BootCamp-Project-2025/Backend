import { Language } from "../../entities/Language";

export interface ILanguagesService {
  addLanguage(language: Language, freelancerId: string): Promise<Language>;
  removeLanguage(languageId: string, freelancerId: string): Promise<void>;
  getLanguages(freelancerId: string): Promise<Language[]>;
  updateLanguage(language: Language, freelancerId: string): Promise<Language>;
}
