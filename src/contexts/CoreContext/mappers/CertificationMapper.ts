import { Certification as PrismaCertifcation } from "@/generated/prisma";
import { ArrayToArrayMapper } from "./ArrayToArrayMapper";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Certification } from "../domain/entities/Certification";

export class CertificationMapper extends ArrayToArrayMapper<
  Certification,
  PrismaCertifcation
> {
  mapDomainToPersistance(origin: Certification): {
    id: string;
    freelancerId: string;
    certification: string;
    institution: string;
    year: Date;
  } {
    console.log(origin);
    throw new Error("Method not implemented.");
  }
  mapPersistanceToDomain(origin: {
    certification: string;
    id: string;
    institution: string;
    year: Date;
    freelancerId: string;
  }): Certification {
    return Certification.create(
      {
        certification: origin.certification,
        institution: origin.institution,
        year: origin.year.getFullYear(),
      },
      new UniqueEntityID(origin.id)
    );
  }
}
