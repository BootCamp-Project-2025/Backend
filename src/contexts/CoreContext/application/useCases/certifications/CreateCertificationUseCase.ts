import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";
import { ICreateCertificationDTO } from "@/contexts/CoreContext/domain/interfaces/dtos/certifications/ICreateCertificationDto";
import { IGetCertificationDTO } from "@/contexts/CoreContext/domain/interfaces/dtos/certifications/IGetCertificationDto";
import { ICertificationRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/ICertificationRepository";
import { IFreelancerRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateCertificationUseCase
  implements
    IUseCase<
      { certification: ICreateCertificationDTO; freelancerId: string },
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
    certification: IGetCertificationDTO;
    freelancerId: string;
  }): Promise<void> {
    try {
      const { certification, freelancerId } = params;

      const certificationDomain = Certification.create(
        { ...certification },
        new UniqueEntityID()
      );

      const freelancer = await this.freelancerRepository.getById(freelancerId);

      if (!freelancer) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Freelancer not found");
      }

      freelancer.certifications.add(certificationDomain);

      await this.certificationRepository.create(
        certificationDomain,
        freelancerId
      );
    } catch (error) {
      console.log("Error creating certification:", error);
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `Failed to create certification: ${error}`
      );
    }
  }
}
