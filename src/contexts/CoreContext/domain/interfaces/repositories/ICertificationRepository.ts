import { Certification } from "../../entities/Certification";

export interface ICertificationRepository {
  findByFreelancerId(freelancerId: string): Promise<Certification[]>;
  create(certification: Certification, freelancerId: string): Promise<void>;
  delete(certificationId: string): Promise<void>;
  update(
    certificationId: string,
    certification: Certification,
    freelancerId: string
  ): Promise<void>;
  findById(certificationId: string): Promise<Certification | null>;
}
