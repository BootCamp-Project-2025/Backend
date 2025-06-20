import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";
import { ILanguageRepository } from "../../domain/interfaces/repositories/ILanguageRepositoty";
import { Language } from "../../domain/entities/Language";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

@injectable()
export class GetLanguagesUseCase implements IUseCase<string, Language[]> {
  constructor(
    @inject("ILanguageRepository")
    private languageRepository: ILanguageRepository
  ) {}

  async execute(freelancerId: string): Promise<Language[]> {
    try {
      return this.languageRepository.getLanguages(freelancerId);
    } catch (error) {
      if (error as ApiError) {
        throw error;
      } else {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
      }
    }
  }
}
