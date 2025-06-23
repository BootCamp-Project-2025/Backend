import { ICreateCertificationDTO } from "@/contexts/CoreContext/domain/interfaces/dtos/certifications/ICreateCertificationDto";
import { ICertificationRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/ICertificationRepository";
import { IFreelancerRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateCertificationUseCase
  implements
    IUseCase<
      {
        certificationId: string;
        certification: ICreateCertificationDTO;
        freelancerId: string;
      },
      void
    >
{
  constructor(
    @inject("ICertificationRepository")
    private certificationRepository: ICertificationRepository,
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository
  ) {}

  async execute(params: {
    certificationId: string;
    certification: ICreateCertificationDTO;
    freelancerId: string;
  }): Promise<void> {
    const { certificationId, certification, freelancerId } = params;

    const freelancer = await this.freelancerRepository.getById(freelancerId);
    if (!freelancer) {
      throw new ApiError(404, "Freelancer not found");
    }

    const existingCertification = freelancer.certifications
      .getItems()
      .find((cert) => cert.id.toString() === certificationId);

    if (!existingCertification) {
      throw new ApiError(404, "Certification not found");
    }

    existingCertification.edit(certification);

    try {
      await this.certificationRepository.update(
        certificationId,
        existingCertification,
        freelancerId
      );
    } catch (error) {
      if (error instanceof ApiError) throw error;

      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `Failed to update certification: ${error}`
      );
    }
  }
}
