import { IRepository } from "@/contexts/Shared/domain/repository/IRepository";
import { Freelancer } from "../../aggregates/Freelancer";
import { Language } from "../../entities/Language";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

export interface ILanguageRepository extends IRepository<Freelancer> {
  getlanguageId(
    freelancerId: string,
    language: Language
  ): Promise<string | undefined>;
  getLanguages(freelancerId: string): Promise<Language[]>;
  addLanguage(freelancerId: string, language: Language): Promise<Language>;
  editLanguage(freelancerId: string, language: Language): Promise<Language>;
  deleteLanguage(languageId: UniqueEntityID): Promise<Language>;
}
