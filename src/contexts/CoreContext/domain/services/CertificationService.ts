import { ICertificationService } from "../interfaces/services/ICertificationService";
import { Certification } from "../valueObjects/Certification";

export class CertificationService implements ICertificationService {
  private readonly certifications: Certification[];

  private constructor(certifications: Certification[]) {
    if (certifications.length > 10) {
      throw new Error("A freelancer cannot have more than 10 certifications.");
    }
    this.certifications = certifications;
  }

  public static create(
    certifications: Certification[] = []
  ): CertificationService {
    return new CertificationService(certifications);
  }

  public getAll(): Certification[] {
    return this.certifications;
  }

  public add(certification: Certification): void {
    if (this.certifications.length >= 10) {
      throw new Error("Maximum number of certifications reached.");
    }
    this.certifications.push(certification);
  }

  public removeByName(certificationName: string): void {
    const index = this.certifications.findIndex(
      (cert) => cert.certification === certificationName
    );
    if (index === -1) {
      throw new Error("Certification not found.");
    }
    this.certifications.splice(index, 1);
  }

  public count(): number {
    return this.certifications.length;
  }
}
