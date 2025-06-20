import { Certification } from "../../entities/Certification";
import { IGetCertificationDTO } from "../dtos/certifications/IGetCertificationDto";

export interface ICertificationService {
  getAll(freelancerId: string): Promise<Certification[]>;
  create(
    certification: IGetCertificationDTO,
    freelancerId: string
  ): Promise<void>;
  update(
    certificationId: string,
    certification: IGetCertificationDTO,
    freelancerId: string
  ): Promise<void>;
  delete(certificationId: string, freelancerId: string): Promise<void>;
}
