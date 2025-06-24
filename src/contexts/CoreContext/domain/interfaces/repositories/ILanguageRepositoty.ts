import { IRepository } from "@/contexts/Shared/domain/repository/IRepository";
import { Language } from "../../entities/Language";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

export interface ILanguageRepository extends IRepository<Language> {
  getlanguageId(
    freelancerId: string,
    language: Language
  ): Promise<string | undefined>;
  getLanguages(freelancerId: string): Promise<Language[]>;
  addLanguage(freelancerId: string, language: Language): Promise<Language>;
  editLanguage(language: Language): Promise<Language>;
  deleteLanguage(languageId: UniqueEntityID): Promise<Language>;
}
