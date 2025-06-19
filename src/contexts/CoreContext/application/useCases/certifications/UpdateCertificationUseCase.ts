import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";
import { ICertificationRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/ICertificationRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateCertificationUseCase
  implements
    IUseCase<
      {
        certificationId: string;
        certification: Certification;
        freelancerId: string;
      },
      void
    >
{
  constructor(
    @inject("ICertificationRepository")
    private certificationRepository: ICertificationRepository
  ) {}

  async execute(params: {
    certificationId: string;
    certification: Certification;
    freelancerId: string;
  }): Promise<void> {
    const { certificationId, certification, freelancerId } = params;
    const savedCertification =
      this.certificationRepository.findById(certificationId);
    if (!savedCertification) {
      throw new ApiError(404, "Certification not found");
    }
    await this.certificationRepository.update(
      certificationId,
      certification,
      freelancerId
    );
  }
}
