import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { Certification } from "../entities/Certification";
import { ManyRelationship } from "@/contexts/Shared/domain/ManyRelationship";
import { StatusCodes } from "http-status-codes";

export class Certifications extends ManyRelationship<Certification> {
  private constructor(certifications: Certification[]) {
    if (certifications.length > 10) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "A freelancer cannot have more than 10 certifications."
      );
    }
    super(certifications);
  }

  compareItems(a: Certification, b: Certification): boolean {
    return a.equals(b);
  }

  public static create(certifications: Certification[] = []): Certifications {
    return new Certifications(certifications);
  }

  public add(certification: Certification): void {
    if (this.getItems().length >= 10) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Maximum number of certifications reached."
      );
    }
    super.add(certification);
  }

  public remove(certification: Certification): void {
    super.remove(certification);
  }

  public edit(editedCertification: Certification): void {
    const index = this.getItems().findIndex((certification) =>
      certification.id.equals(editedCertification.id)
    );
    if (index === -1)
      throw new ApiError(StatusCodes.CONTINUE, "experience doesnt exist");
    super.edit(editedCertification, index);
  }

  public removeByName(certificationName: string): void {
    const index = this.getItems().findIndex(
      (cert) => cert.certification === certificationName
    );
    if (index === -1) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Certification not found.");
    }
    this.remove(this.getItems()[index]);
  }
}
