import { inject, injectable } from "tsyringe";
import { Certification } from "../../domain/entities/Certification";
import { ICertificationService } from "../../domain/interfaces/services/ICertificationService";
import { GetCertificationsUseCase } from "../useCases/certifications/GetCertificationUseCase";
import { CreateCertificationUseCase } from "../useCases/certifications/CreateCertificationUseCase";
import { DeleteCertificationUseCase } from "../useCases/certifications/DeleteCertificationUseCase";
import { UpdateCertificationUseCase } from "../useCases/certifications/UpdateCertificationUseCase";
import { GetCertificationByIdUseCase } from "../useCases/certifications/GetCertificationByIdUseCase";
import { CertificationDTO } from "../../domain/interfaces/dtos/ICertificationDto";
import CertificationMapper from "../../mappers/CertificationMapper";

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
  async getByFreelancerId(id: string): Promise<CertificationDTO[]> {
    const certifications: Certification[] =
      await this.getCertificationUseCase.execute(id);
    return certifications.map(CertificationMapper.domainToDto);
  }
  create(certification: CertificationDTO, freelancerId: string): Promise<void> {
    return this.createCertificationUseCase.execute({
      certification,
      freelancerId,
    });
  }

  async delete(certificationId: string): Promise<void> {
    return this.deleteCertificationUseCase.execute(certificationId);
  }
  async update(
    certificationId: string,
    certification: CertificationDTO,
    freelancerId: string
  ): Promise<void> {
    const certificationDomain = CertificationMapper.dtoToDomain(
      certification,
      certificationId
    );

    return this.updateCertificationUseCase.execute({
      certificationId,
      certification: certificationDomain,
      freelancerId,
    });
  }
  async getById(certificationId: string): Promise<CertificationDTO> {
    const certification =
      await this.getCertificationById.execute(certificationId);
    return CertificationMapper.domainToDto(certification);
  }
}
