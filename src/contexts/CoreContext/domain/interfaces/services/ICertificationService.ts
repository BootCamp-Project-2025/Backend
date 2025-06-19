import { Certification } from "../../entities/Certification";
import { CertificationDTO } from "../dtos/ICertificationDto";

export interface ICertificationService {
  getAll(freelancerId: string): Promise<Certification[]>;
  create(certification: CertificationDTO, freelancerId: string): Promise<void>;
  update(
    certificationId: string,
    certification: CertificationDTO,
    freelancerId: string
  ): Promise<void>;
  delete(certificationId: string, freelancerId: string): Promise<void>;
}
