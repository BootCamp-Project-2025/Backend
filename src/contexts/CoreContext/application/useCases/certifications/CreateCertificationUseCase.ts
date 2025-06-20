import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";
import { ICreateCertificationDTO } from "@/contexts/CoreContext/domain/interfaces/dtos/certifications/ICreateCertificationDto";
import { IGetCertificationDTO } from "@/contexts/CoreContext/domain/interfaces/dtos/certifications/IGetCertificationDto";
import { ICertificationRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/ICertificationRepository";
import { IFreelancerRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateCertificationUseCase
  implements
    IUseCase<
      { certification: ICreateCertificationDTO; freelancerId: string },
      void
    >
{
  constructor(
    @inject("ICertificationRepository")
    private certificationRepository: ICertificationRepository,
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository
  ) {}

  async execute(params: {
    certification: IGetCertificationDTO;
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
