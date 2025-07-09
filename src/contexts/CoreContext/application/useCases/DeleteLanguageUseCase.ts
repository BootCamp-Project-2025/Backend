import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";
import { ILanguageRepository } from "../../domain/interfaces/repositories/ILanguageRepositoty";
import { Freelancer } from "../../domain/aggregates/Freelancer";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { DeleteLanguageDto } from "../../domain/interfaces/dtos/DeleteLanguageDto";

@injectable()
export class DeleteLanguageUseCase
  implements IUseCase<DeleteLanguageDto, void>
{
  constructor(
    @inject("ILanguageRepository")
    private languageRepository: ILanguageRepository,
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository
  ) {}

  async execute({
    languageId,
    freelancerId,
  }: DeleteLanguageDto): Promise<void> {
    try {
      const freelancer: Freelancer | null =
        await this.freelancerRepository.getById(freelancerId);
      if (freelancer === null) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Freelancer not found");
      }

      const languages = freelancer.languages.getItems();
      const language = languages.find(
        (row) => row.id.toString() === languageId
      );

      if (!language) {
        throw new ApiError(StatusCodes.NOT_FOUND, "the language doesnt exist");
      }

      freelancer.languages.remove(language);
      await this.languageRepository.delete(
        new UniqueEntityID(languageId).toString()
      );
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
      }
    }
  }
}
