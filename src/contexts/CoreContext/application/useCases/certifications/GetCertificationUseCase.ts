import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";
import { IFreelancerRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

import { inject, injectable } from "tsyringe";

@injectable()
export class GetCertificationsUseCase
  implements IUseCase<string, Certification[]>
{
  constructor(
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository
  ) {}

  async execute(id: string): Promise<Certification[]> {
    const freelancer = await this.freelancerRepository.getById(id);

    if (!freelancer) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Freelancer not found");
    }

    try {
      return freelancer.certifications.getItems();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `Failed to get certifications: ${error}`
      );
    }
  }
}
