import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";
import { IFreelancerRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetCertificationByIdUseCase
  implements
  IUseCase<
    {
      certificationId: string;
      freelancerId: string;
    },
    Certification
  > {
  constructor(
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository
  ) { }

  async execute({
    certificationId,
    freelancerId,
  }: {
    certificationId: string;
    freelancerId: string;
  }): Promise<Certification> {
    const freelancer = await this.freelancerRepository.getById(freelancerId);
    const certifications = freelancer?.certifications.getItems();
    const certification = certifications?.find(
      (cert) => cert.id.toString() === certificationId
    );
    if (!certification) {
      throw new ApiError(404, "Certification not found");
    }
    return certification;
  }
}
