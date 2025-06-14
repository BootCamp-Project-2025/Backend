import { CertificationDTO } from "../dtos/ICertificationDto";

export interface ICertificationService {
  getByFreelancerId(id: string): Promise<CertificationDTO[]>;
  create(certification: CertificationDTO, freelancerId: string): Promise<void>;
  delete(certificationId: string): Promise<void>;
  update(
    certificationId: string,
    certification: CertificationDTO,
    freelancerId: string
  ): Promise<void>;
  getById(certificationId: string): Promise<CertificationDTO | null>;
}
