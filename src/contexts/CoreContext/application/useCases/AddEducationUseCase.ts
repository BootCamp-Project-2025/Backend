import "reflect-metadata";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import IEducationRepository from "../../domain/interfaces/repositories/IEducationRepository";
import { Education } from "../../domain/entities/Education";
import { inject, injectable } from "tsyringe";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { Freelancer } from "../../domain/aggregates/Freelancer";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";

@injectable()
export default class AddEducationUseCase
  implements IUseCase<Education, Education>
{
  constructor(
    @inject("EducationRepository")
    private educationRepository: IEducationRepository,
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository
  ) {}

  async execute(education: Education): Promise<Education> {
    try {
      const freelancer: Freelancer | null =
        await this.freelancerRepository.getById(education.freelancerId);
      if (freelancer !== null) {
        freelancer.education.add(Education.create(education));

        return await this.educationRepository.create(
          freelancer.education.getNewItems()[0]
        );
      }

      throw new ApiError(StatusCodes.BAD_REQUEST, "Freelancer not found");
    } catch (error) {
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  }
}
