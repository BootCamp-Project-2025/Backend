import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";
import { ICertificationRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/ICertificationRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetCertificationByIdUseCase
  implements IUseCase<string, Certification | null>
{
  constructor(
    @inject("ICertificationRepository")
    private certificationRepository: ICertificationRepository
  ) {}

  async execute(certificationId: string): Promise<Certification | null> {
    const cert = await this.certificationRepository.findById(certificationId);
    if (!cert) return null;
    return cert;
  }
}
