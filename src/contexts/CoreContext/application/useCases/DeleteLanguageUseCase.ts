import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";
import { CreateLanguageDto } from "../../domain/interfaces/dtos/CreateLanguageDto";
import { ILanguageRepository } from "../../domain/interfaces/repositories/ILanguageRepositoty";
import { Language } from "../../domain/entities/Language";
import { Freelancer } from "../../domain/aggregates/Freelancer";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";

@injectable()
export class DeleteLanguageUseCase
  implements IUseCase<CreateLanguageDto, Language>
{
  constructor(
    @inject("ILanguageRepository")
    private languageRepository: ILanguageRepository,
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository
  ) {}

  async execute({
    language,
    freelancerId,
  }: CreateLanguageDto): Promise<Language> {
    try {
      const freelancer: Freelancer | null =
        await this.freelancerRepository.getById(freelancerId);
      if (freelancer !== null) {
        freelancer.languages.remove(Language.create(language, language.id));
        return this.languageRepository.deleteLanguage(language.id);
      }

      throw new ApiError(StatusCodes.BAD_REQUEST, "Freelancer not found");
    } catch (error) {
      if (error as ApiError) {
        throw error;
      } else {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
      }
    }
  }
}
