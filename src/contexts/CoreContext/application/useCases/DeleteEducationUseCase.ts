import "reflect-metadata";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import IEducationRepository from "../../domain/interfaces/repositories/IEducationRepository";
import { injectable, inject } from "tsyringe";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { Freelancer } from "../../domain/aggregates/Freelancer";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";
import { DeleteEducationDto } from "../../domain/interfaces/dtos/DeleteEducationDto";

@injectable()
export default class DeleteEducationUseCase
  implements IUseCase<DeleteEducationDto, void>
{
  constructor(
    @inject("EducationRepository")
    private educationRepository: IEducationRepository,
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository
  ) {}

  async execute({
    educationId,
    freelancerId,
  }: DeleteEducationDto): Promise<void> {
    try {
      const freelancer: Freelancer | null =
        await this.freelancerRepository.getById(freelancerId);
      if (freelancer === null) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Freelancer not found");
      }
      const educations = freelancer.education.getItems();
      const education = educations.find(
        (row) => row.id.toString() === educationId
      );

      if (!education) {
        throw new ApiError(StatusCodes.NOT_FOUND, "the education doesnt exist");
      }

      freelancer.education.remove(education);
      await this.educationRepository.delete(education.id.toString());
    } catch (error) {
      if (error as ApiError) throw error;
      else
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
    }
  }
}
