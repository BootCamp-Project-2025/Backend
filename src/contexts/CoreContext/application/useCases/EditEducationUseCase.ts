import "reflect-metadata";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import IEducationRepository from "../../domain/interfaces/repositories/IEducationRepository";
import { Education } from "../../domain/entities/Education";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";
import { injectable, inject } from "tsyringe";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { CreateEducationDto } from "../../domain/interfaces/dtos/CreateEducationDto";
import { Freelancer } from "../../domain/aggregates/Freelancer";

@injectable()
export default class EditEducationUseCase
  implements IUseCase<CreateEducationDto, void | Education>
{
  constructor(
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository,
    @inject("EducationRepository")
    private educationRepository: IEducationRepository
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute({
    freelancerId,
    education,
  }: CreateEducationDto): Promise<void | Education> {
    try {
      const freelancer: Freelancer | null =
        await this.freelancerRepository.getById(freelancerId);
      if (freelancer !== null) {
        if (!freelancer.education.exists(education)) {
          throw new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "education not found"
          );
        }

        freelancer.education.edit(education);
        return this.educationRepository.update(
          education.id.toString(),
          education
        );
      }
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "freelancer not found"
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
