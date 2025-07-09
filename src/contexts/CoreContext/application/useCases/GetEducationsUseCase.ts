import "reflect-metadata";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Education } from "../../domain/entities/Education";
import IEducationRepository from "../../domain/interfaces/repositories/IEducationRepository";
import { injectable, inject } from "tsyringe";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";
import { Freelancer } from "../../domain/aggregates/Freelancer";

@injectable()
export default class GetEducationsUseCase
  implements IUseCase<string, Education[]>
{
  constructor(
    @inject("EducationRepository")
    private educationRepository: IEducationRepository,
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository
  ) {}

  async execute(freelancerId: string): Promise<Education[]> {
    try {
      const freelancer: Freelancer | null =
        await this.freelancerRepository.getById(freelancerId);
      if (freelancer === null) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Freelancer not found.");
      }

      return await this.educationRepository.getByFreelancerId(freelancerId);
    } catch (error) {
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  }
}
