import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";
import { ICertificationRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/ICertificationRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
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
    await this.certificationRepository.update(
      certificationId,
      certification,
      freelancerId
    );
  }
}
