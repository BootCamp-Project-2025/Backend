import { CertificationDTO } from "@/contexts/CoreContext/domain/interfaces/dtos/ICertificationDto";
import { ICertificationRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/ICertificationRepository";
import CertificationMapper from "@/contexts/CoreContext/mappers/CertificationMapper";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateCertificationUseCase
  implements
  IUseCase<{ certification: CertificationDTO; freelancerId: string }, void> {
  constructor(
    @inject("ICertificationRepository")
    private certificationRepository: ICertificationRepository
  ) { }

  async execute(params?: {
    certification: CertificationDTO;
    freelancerId: string;
  }): Promise<void> {
    if (!params) {
      throw new Error("Missing parameters for creating certification.");
    }
    const { certification: certificationDto, freelancerId } = params;
    const certification = CertificationMapper.dtoToDomain(certificationDto);
    await this.certificationRepository.create(certification, freelancerId);
  }
}
