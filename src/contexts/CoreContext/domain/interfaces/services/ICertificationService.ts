import { Certification } from "../../entities/Certification";
import { CertificationDTO } from "../dtos/ICertificationDto";

export interface ICertificationService {
  getByFreelancerId(id: string): Promise<Certification[]>;
  create(certification: CertificationDTO, freelancerId: string): Promise<void>;
  delete(certificationId: string): Promise<void>;
  update(
    certificationId: string,
    certification: Certification,
    freelancerId: string
  ): Promise<void>;
  getById(certificationId: string): Promise<Certification | null>;
}
