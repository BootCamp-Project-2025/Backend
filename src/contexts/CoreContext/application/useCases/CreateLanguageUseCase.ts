import { inject, injectable } from "tsyringe";
import { Language } from "../../domain/entities/Language";
import { CreateLanguageDto } from "../../domain/interfaces/dtos/CreateLanguageDto";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ILanguageRepository } from "../../domain/interfaces/repositories/ILanguageRepositoty";
import { Freelancer } from "../../domain/aggregates/Freelancer";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";

@injectable()
export class CreateLanguageUseCase
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
        freelancer.languages.add(
          Language.create(language, new UniqueEntityID())
        );
        return this.languageRepository.addLanguage(
          freelancerId,
          freelancer.languages.getNewItems()[0]
        );
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
