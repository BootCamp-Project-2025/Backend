import { ICertificationRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/ICertificationRepository";
import { IFreelancerRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteCertificationUseCase
  implements IUseCase<{ certificationId: string; freelancerId: string }, void>
{
  constructor(
    @inject("ICertificationRepository")
    private certificationRepository: ICertificationRepository,
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository
  ) {}

  async execute(params: {
    certificationId: string;
    freelancerId: string;
  }): Promise<void> {
    const { certificationId, freelancerId } = params;

    const freelancer = await this.freelancerRepository.getById(freelancerId);
    if (!freelancer) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Freelancer not found");
    }

    const certifications = freelancer.certifications.getItems();
    const certification = certifications.find(
      (cert) => cert.id.toString() === certificationId
    );
    if (!certification) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Certification not found");
    }

    try {
      await this.certificationRepository.delete(certificationId);
      freelancer.certifications.remove(certification);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `Failed to delete certification: ${error}`
      );
    }
  }
}
