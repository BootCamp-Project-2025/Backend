import { Certification } from "../../entities/Certification";

export interface ICertificationService {
  getByFreelancerId(id: string): Promise<Certification[]>;
}
