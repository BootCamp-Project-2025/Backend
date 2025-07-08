import { Certification } from "../../entities/Certification";
import { IGetCertificationDTO } from "../dtos/certifications/IGetCertificationDto";

export interface ICertificationService {
  getAll(freelancerId: string): Promise<Certification[]>;
  create(
    certification: IGetCertificationDTO,
    freelancerId: string
  ): Promise<Certification>;
  update(
    certificationId: string,
    certification: IGetCertificationDTO,
    freelancerId: string
  ): Promise<Certification>;
  delete(certificationId: string, freelancerId: string): Promise<void>;
}
