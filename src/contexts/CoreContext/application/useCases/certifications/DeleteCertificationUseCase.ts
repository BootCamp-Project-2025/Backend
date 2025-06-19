import { ICertificationRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/ICertificationRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteCertificationUseCase implements IUseCase<string, void> {
  constructor(
    @inject("ICertificationRepository")
    private certificationRepository: ICertificationRepository
  ) {}

  async execute(certificationId: string): Promise<void> {
    const savedCertification =
      await this.certificationRepository.findById(certificationId);
    if (!savedCertification) {
      throw new ApiError(404, "Certification not found");
    }
    if (!certificationId) {
      throw new Error("Missing parameters for deleting certification.");
    }
    await this.certificationRepository.delete(certificationId);
  }
}
