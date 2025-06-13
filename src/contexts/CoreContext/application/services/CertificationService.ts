import { inject, injectable } from "tsyringe";
import { Certification } from "../../domain/entities/Certification";
import { ICertificationService } from "../../domain/interfaces/services/ICertificationService";
import { GetCertificationsUseCase } from "../useCases/certifications/GetCertificationUseCase";

@injectable()
export class CertificationService implements ICertificationService {
  constructor(
    @inject("GetCertificationUseCase")
    private getCertificationUseCase: GetCertificationsUseCase
  ) {}
  getByFreelancerId(id: string): Promise<Certification[]> {
    return this.getCertificationUseCase.execute(id);
  }
}
