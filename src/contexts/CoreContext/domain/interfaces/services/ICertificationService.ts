import { Certification } from "../../entities/Certification";

export interface ICertifications {
  getAll(): Certification[];
  add(certification: Certification): void;
  removeByName(certificationName: string): void;
  count(): number;
}
