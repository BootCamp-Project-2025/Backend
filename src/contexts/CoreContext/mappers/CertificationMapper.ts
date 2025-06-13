import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Certification as PrismaCertification } from "@/generated/prisma";
import { Certification } from "../domain/entities/Certification";

export default class CertificationMapper {
  static toDomain(certification: PrismaCertification): Certification {
    return Certification.create(
      {
        certification: certification.certification,
        institution: certification.institution,
        year: certification.year.getFullYear(),
      },
      new UniqueEntityID(certification.id)
    );
  }
}
