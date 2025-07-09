import { inject, injectable } from "tsyringe";
import { IExperienceRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IExperienceRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { Freelancer } from "../../../domain/aggregates/Freelancer";
import { IFreelancerRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository";
import { DeleteExperienceDto } from "@/contexts/CoreContext/domain/interfaces/dtos/DeleteExpecienceDto";

@injectable()
export class DeleteExperienceUseCase
  implements IUseCase<DeleteExperienceDto, void>
{
  constructor(
    @inject("IExperienceRepository")
    private readonly experienceRepository: IExperienceRepository,
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository
  ) {}

  async execute({
    experienceId,
    freelancerId,
  }: DeleteExperienceDto): Promise<void> {
    try {
      if (!experienceId) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          "Missing experience ID to delete."
        );
      }

      const freelancer: Freelancer | null =
        await this.freelancerRepository.getById(freelancerId);
      if (freelancer === null) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Freelancer not found");
      }
      const experiences = freelancer.experience.getItems();
      const experience = experiences.find(
        (row) => row.id.toString() === experienceId
      );

      if (!experience) {
        throw new ApiError(
          StatusCodes.NOT_FOUND,
          "the experience doesnt exist"
        );
      }
      freelancer.experience.remove(experience);
      await this.experienceRepository.delete(experienceId);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Server error while deleting experience."
      );
    }
  }
}
