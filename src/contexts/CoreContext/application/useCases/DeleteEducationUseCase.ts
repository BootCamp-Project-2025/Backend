import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import IEducationRepository from "../../domain/interfaces/repositories/IEducationRepository";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";
import { injectable, inject } from "tsyringe";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

@injectable()
export default class DeleteEducationUseCase implements IUseCase<string, void> {
  constructor(
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository,
    @inject("EducationRepository")
    private educationRepository: IEducationRepository
  ) {}

  async execute(id: string): Promise<void> {
    try {
      await this.educationRepository.delete(id);
    } catch (error) {
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  }
}
