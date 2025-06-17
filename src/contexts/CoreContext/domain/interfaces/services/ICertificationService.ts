import { Certification } from "../../entities/Certification";

export interface ICertificationService {
  getAll(): Certification[];
  add(certification: Certification): void;
  removeByName(certificationName: string): void;
  count(): number;
}
