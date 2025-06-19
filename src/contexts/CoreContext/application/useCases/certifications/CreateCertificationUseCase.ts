import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";
import { CertificationDTO } from "@/contexts/CoreContext/domain/interfaces/dtos/ICertificationDto";
import { ICertificationRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/ICertificationRepository";
import { IFreelancerRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateCertificationUseCase
  implements
  IUseCase<{ certification: CertificationDTO; freelancerId: string }, void> {
  constructor(
    @inject("ICertificationRepository")
    private certificationRepository: ICertificationRepository,
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository
  ) { }

  async execute(params: {
    certification: CertificationDTO;
    freelancerId: string;
  }): Promise<void> {
    const { certification, freelancerId } = params;
    const freelancer = await this.freelancerRepository.getById(freelancerId);
    const certificationDomain = Certification.create(
      { ...certification },
      new UniqueEntityID()
    );
    freelancer?.certifications.add(certificationDomain);
    await this.certificationRepository.create(
      certificationDomain,
      freelancerId
    );
  }
}
