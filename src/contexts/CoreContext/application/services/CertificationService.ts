import { inject, injectable } from "tsyringe";
import { Certification } from "../../domain/entities/Certification";
import { GetCertificationsUseCase } from "../useCases/certifications/GetCertificationUseCase";
import { CreateCertificationUseCase } from "../useCases/certifications/CreateCertificationUseCase";
import { DeleteCertificationUseCase } from "../useCases/certifications/DeleteCertificationUseCase";
import { UpdateCertificationUseCase } from "../useCases/certifications/UpdateCertificationUseCase";
import { GetCertificationByIdUseCase } from "../useCases/certifications/GetCertificationByIdUseCase";
import { CertificationDTO } from "../../domain/interfaces/dtos/ICertificationDto";
import { ICertificationService } from "../../domain/interfaces/services/ICertificationService";

@injectable()
export class CertificationService implements ICertificationService {
  constructor(
    @inject("GetCertificationUseCase")
    private getCertificationUseCase: GetCertificationsUseCase,
    @inject("CreateCertificationUseCase")
    private createCertificationUseCase: CreateCertificationUseCase,
    @inject("UpdateCertificationUseCase")
    private updateCertificationUseCase: UpdateCertificationUseCase,
    @inject("DeleteCertificationUseCase")
    private deleteCertificationUseCase: DeleteCertificationUseCase,
    @inject("GetCertificationById")
    private getCertificationById: GetCertificationByIdUseCase
  ) {}
  create(certification: CertificationDTO, freelancerId: string): Promise<void> {
    return this.createCertificationUseCase.execute({
      certification,
      freelancerId,
    });
  }
  update(
    certificationId: string,
    certification: CertificationDTO,
    freelancerId: string
  ): Promise<void> {
    return this.updateCertificationUseCase.execute({
      certificationId,
      certification,
      freelancerId,
    });
  }
  delete(certificationId: string, freelancerId: string): Promise<void> {
    return this.deleteCertificationUseCase.execute({
      certificationId,
      freelancerId,
    });
  }
  getAll(freelancerId: string): Promise<Certification[]> {
    return this.getCertificationUseCase.execute(freelancerId);
  }
}
