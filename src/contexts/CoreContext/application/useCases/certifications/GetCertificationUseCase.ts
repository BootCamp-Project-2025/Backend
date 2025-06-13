import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";
import { ICertificationRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/ICertificationRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";

import { inject, injectable } from "tsyringe";

@injectable()
export class GetCertificationsUseCase
  implements IUseCase<string, Certification[]>
{
  constructor(
    @inject("ICertificationRepository") private repo: ICertificationRepository
  ) {}

  async execute(id: string): Promise<Certification[]> {
    return await this.repo.findByFreelancerId(id);
  }
}
