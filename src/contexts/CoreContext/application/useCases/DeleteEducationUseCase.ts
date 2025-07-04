import "reflect-metadata";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import IEducationRepository from "../../domain/interfaces/repositories/IEducationRepository";
import { injectable, inject } from "tsyringe";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { Freelancer } from "../../domain/aggregates/Freelancer";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";
import { Education } from "../../domain/entities/Education";

@injectable()
export default class DeleteEducationUseCase
  implements IUseCase<Education, void>
{
  constructor(
    @inject("EducationRepository")
    private educationRepository: IEducationRepository,
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository
  ) {}

  async execute(education: Education): Promise<void> {
    try {
      const freelancer: Freelancer | null =
        await this.freelancerRepository.getById(education.freelancerId);
      if (freelancer !== null) {
        if (!freelancer.education.exists(education)) {
          throw new ApiError(
            StatusCodes.BAD_REQUEST,
            "the language doesnt exist"
          );
        }
        freelancer.education.remove(education);
        await this.educationRepository.delete(education.id.toString());
      }

      throw new ApiError(StatusCodes.BAD_REQUEST, "Freelancer not found");
    } catch (error) {
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  }
}
