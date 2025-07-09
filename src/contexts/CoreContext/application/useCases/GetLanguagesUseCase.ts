import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";
import { ILanguageRepository } from "../../domain/interfaces/repositories/ILanguageRepositoty";
import { Language } from "../../domain/entities/Language";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";
import { Freelancer } from "../../domain/aggregates/Freelancer";

@injectable()
export class GetLanguagesUseCase implements IUseCase<string, Language[]> {
  constructor(
    @inject("ILanguageRepository")
    private languageRepository: ILanguageRepository,
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository
  ) {}

  async execute(freelancerId: string): Promise<Language[]> {
    try {
      const freelancer: Freelancer | null =
        await this.freelancerRepository.getById(freelancerId);
      if (freelancer === null) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Freelancer not found.");
      }

      return await this.languageRepository.getLanguages(freelancerId);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
      }
    }
  }
}
