import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Education } from "../../domain/entities/Education";
import IEducationRepository from "../../domain/interfaces/repositories/IEducationRepository";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";
import { injectable, inject } from "tsyringe";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

@injectable()
export default class GetEducationsUseCase
  implements IUseCase<string, Education[]>
{
  constructor(
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository,
    @inject("EducationRepository")
    private educationRepository: IEducationRepository
  ) {}
  async execute(freelancerId: string): Promise<Education[]> {
    try {
      return await this.educationRepository.getByFreelancerId(freelancerId);
    } catch (error) {
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  }
}
