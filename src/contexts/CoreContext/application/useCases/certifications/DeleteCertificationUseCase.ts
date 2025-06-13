import { ICertificationRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/ICertificationRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteCertificationUseCase implements IUseCase<string, void> {
  constructor(
    @inject("ICertificationRepository")
    private certificationRepository: ICertificationRepository
  ) {}

  async execute(certificationId: string): Promise<void> {
    if (!certificationId) {
      throw new Error("Missing parameters for deleting certification.");
    }
    await this.certificationRepository.delete(certificationId);
  }
}
