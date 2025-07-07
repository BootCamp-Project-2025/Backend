import "reflect-metadata";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import IEducationRepository from "../../domain/interfaces/repositories/IEducationRepository";
import { injectable, inject } from "tsyringe";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { Freelancer } from "../../domain/aggregates/Freelancer";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";
import { CreateEducationDto } from "../../domain/interfaces/dtos/CreateEducationDto";

@injectable()
export default class DeleteEducationUseCase
  implements IUseCase<CreateEducationDto, void | string>
{
  constructor(
    @inject("EducationRepository")
    private educationRepository: IEducationRepository,
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository
  ) {}

  async execute({
    education,
    freelancerId,
  }: CreateEducationDto): Promise<void | string> {
    try {
      const freelancer: Freelancer | null =
        await this.freelancerRepository.getById(freelancerId);
      if (freelancer !== null) {
        if (!freelancer.education.exists(education)) {
          throw new ApiError(
            StatusCodes.BAD_REQUEST,
            "the language doesnt exist"
          );
        }
        freelancer.education.remove(education);
        return await this.educationRepository.delete(education.id.toString());
      }

      throw new ApiError(StatusCodes.BAD_REQUEST, "Freelancer not found");
    } catch (error) {
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  }
}
