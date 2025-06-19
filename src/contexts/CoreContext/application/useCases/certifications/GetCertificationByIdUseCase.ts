import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";
import { ICertificationRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/ICertificationRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetCertificationByIdUseCase
  implements IUseCase<string, Certification>
{
  constructor(
    @inject("ICertificationRepository")
    private certificationRepository: ICertificationRepository
  ) {}

  async execute(certificationId: string): Promise<Certification> {
    const cert = await this.certificationRepository.findById(certificationId);
    if (!cert) {
      throw new ApiError(404, "Certification not found");
    }
    return cert;
  }
}
