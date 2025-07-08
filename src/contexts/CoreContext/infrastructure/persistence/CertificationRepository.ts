import prismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { injectable } from "tsyringe";
import { Certification } from "../../domain/entities/Certification";
import { ICertificationRepository } from "../../domain/interfaces/repositories/ICertificationRepository";
import { CertificationMapper } from "../../mappers/CertificationMapper";

@injectable()
export class CertificationRepository implements ICertificationRepository {
  async findByFreelancerId(freelancerId: string): Promise<Certification[]> {
    const certifications = await prismaClient.certification.findMany({
      where: { freelancerId },
    });
    return certifications.map((cert) =>
      new CertificationMapper().mapPersistanceToDomain(cert)
    );
  }
  async create(
    certification: Certification,
    freelancerId: string
  ): Promise<Certification> {
    const certificationData = new CertificationMapper().mapDomainToPersistance(
      certification
    );
    await prismaClient.certification.create({
      data: {
        ...certificationData,
        freelancerId: freelancerId,
      },
    });
    return certification;
  }

  async delete(certificationId: string): Promise<void> {
    await prismaClient.certification.delete({
      where: { id: certificationId },
    });
  }
  async update(
    certificationId: string,
    certification: Certification,
    freelancerId: string
  ): Promise<Certification> {
    const certificationData = new CertificationMapper().mapDomainToPersistance(
      certification
    );
    await prismaClient.certification.update({
      where: { id: certificationId },
      data: {
        ...certificationData,
        freelancerId: freelancerId,
      },
    });

    return certification;
  }
  async findById(certificationId: string): Promise<Certification | null> {
    const certification = await prismaClient.certification.findUnique({
      where: { id: certificationId },
    });
    return certification
      ? new CertificationMapper().mapPersistanceToDomain(certification)
      : null;
  }
}
