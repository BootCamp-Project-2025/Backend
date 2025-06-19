import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Certification as PrismaCertification } from "@/generated/prisma";
import { Certification } from "../domain/entities/Certification";
import { CertificationDTO } from "../domain/interfaces/dtos/ICertificationDto";

export default class CertificationMapper {
  static persistenceToDomain(
    certification: PrismaCertification
  ): Certification {
    return Certification.create(
      {
        certification: certification.certification,
        institution: certification.institution,
        year: certification.year.getFullYear(),
      },
      new UniqueEntityID(certification.id)
    );
  }

  static dtoToDomain(certification: CertificationDTO, id?: string) {
    return Certification.create(
      {
        certification: certification.certification,
        institution: certification.institution,
        year: certification.year,
      },
      id ? new UniqueEntityID(id) : new UniqueEntityID()
    );
  }

  static domainToDto(certification: Certification): CertificationDTO {
    return {
      id: certification.certificationId.toString(),
      certification: certification.certification,
      institution: certification.institution,
      year: certification.year,
    };
  }

  static DomaintoPersistence(
    certification: Certification,
    freelancerId: string
  ): PrismaCertification {
    return {
      id: certification.certificationId.toString(),
      certification: certification.certification,
      institution: certification.institution,
      year: new Date(certification.year, 0, 1),
      freelancerId: freelancerId,
    };
  }
}
