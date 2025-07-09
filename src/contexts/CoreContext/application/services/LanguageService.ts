import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";
import { Language } from "../../domain/entities/Language";
import { CreateLanguageDto } from "../../domain/interfaces/dtos/CreateLanguageDto";
import { ILanguagesService } from "../../domain/interfaces/services/ILanguages";
import { DeleteLanguageDto } from "../../domain/interfaces/dtos/DeleteLanguageDto";

@injectable()
export default class LanguageService implements ILanguagesService {
  constructor(
    @inject("EditLanguageUseCase")
    private readonly editLanguageUseCase: IUseCase<CreateLanguageDto, Language>,
    @inject("CreateLanguageUseCase")
    private createLanguageUseCase: IUseCase<CreateLanguageDto, Language>,
    @inject("GetLanguagesUseCase")
    private readonly getLanguagesUseCase: IUseCase<string, Language[]>,
    @inject("DeleteLanguageUseCase")
    private deleteLanguageUseCase: IUseCase<DeleteLanguageDto, void>
  ) {}
  updateLanguage = async (
    language: Language,
    freelancerId: string
  ): Promise<Language> => {
    return this.editLanguageUseCase.execute({
      language: language,
      freelancerId: freelancerId,
    });
  };
  addLanguage = async (
    language: Language,
    freelancerId: string
  ): Promise<Language> => {
    return this.createLanguageUseCase.execute({
      language: language,
      freelancerId: freelancerId,
    });
  };
  removeLanguage = async (
    languageId: string,
    freelancerId: string
  ): Promise<void> => {
    return this.deleteLanguageUseCase.execute({
      languageId: languageId,
      freelancerId: freelancerId,
    });
  };
  getLanguages = async (freelancerId: string): Promise<Language[]> => {
    return this.getLanguagesUseCase.execute(freelancerId);
  };
}
