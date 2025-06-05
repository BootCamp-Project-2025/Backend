import { Certification } from "../entities/Certification";

export class CertificationCollection {
  private readonly certifications: Certification[];

  private constructor(certifications: Certification[]) {
    if (certifications.length > 10) {
      throw new Error("A freelancer cannot have more than 10 certifications.");
    }
    this.certifications = certifications;
  }

  public static create(
    certifications: Certification[] = []
  ): CertificationCollection {
    return new CertificationCollection(certifications);
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

  public removeById(id: string): void {
    const index = this.certifications.findIndex(
      (cert) => cert.certificationId.toString() === id
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
