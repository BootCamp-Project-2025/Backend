import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";
import { IFreelancerRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";

import { inject, injectable } from "tsyringe";

@injectable()
export class GetCertificationsUseCase
  implements IUseCase<string, Certification[]>
{
  constructor(
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository
  ) {}

  async execute(id: string): Promise<Certification[]> {
    const freelancer = await this.freelancerRepository.getById(id);
    return freelancer?.certifications.getItems() ?? [];
  }
}
