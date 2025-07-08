import { Language } from "../../entities/Language";

export interface ILanguagesService {
  addLanguage(language: Language, freelancerId: string): Promise<Language>;
  removeLanguage(language: Language, freelancerId: string): Promise<Language>;
  getLanguages(freelancerId: string): Promise<Language[]>;
  updateLanguage(language: Language, freelancerId: string): Promise<Language>;
}
