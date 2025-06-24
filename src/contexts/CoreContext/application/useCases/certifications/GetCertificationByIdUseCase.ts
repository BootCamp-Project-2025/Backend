import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";
import { IFreelancerRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetCertificationByIdUseCase
  implements
    IUseCase<
      {
        certificationId: string;
        freelancerId: string;
      },
      Certification
    >
{
  constructor(
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository
  ) {}

  async execute({
    certificationId,
    freelancerId,
  }: {
    certificationId: string;
    freelancerId: string;
  }): Promise<Certification> {
    const freelancer = await this.freelancerRepository.getById(freelancerId);
    if (!freelancer) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Freelancer not found");
    }

    const certification = freelancer.certifications
      .getItems()
      .find((cert) => cert.id.toString() === certificationId);

    if (!certification) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Certification not found");
    }

    try {
      return certification;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `Failed to get certification: ${error}`
      );
    }
  }
}
