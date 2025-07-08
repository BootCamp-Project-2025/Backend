import { Certification } from "../../entities/Certification";

export interface ICertificationRepository {
  findByFreelancerId(freelancerId: string): Promise<Certification[]>;
  create(
    certification: Certification,
    freelancerId: string
  ): Promise<Certification>;
  delete(certificationId: string): Promise<void>;
  update(
    certificationId: string,
    certification: Certification,
    freelancerId: string
  ): Promise<Certification>;
  findById(certificationId: string): Promise<Certification | null>;
}
