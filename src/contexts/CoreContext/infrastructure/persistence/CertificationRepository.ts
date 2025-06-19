import prismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { injectable } from "tsyringe";
import { Certification } from "../../domain/entities/Certification";
import { ICertificationRepository } from "../../domain/interfaces/repositories/ICertificationRepository";
import CertificationMapper from "../../mappers/CertificationMapper";

@injectable()
export class CertificationRepository implements ICertificationRepository {
  async findByFreelancerId(freelancerId: string): Promise<Certification[]> {
    const certifications = await prismaClient.certification.findMany({
      where: { freelancerId },
    });
    return certifications.map((cert) =>
      CertificationMapper.persistenceToDomain(cert)
    );
  }
  async create(
    certification: Certification,
    freelancerId: string
  ): Promise<void> {
    const certificationData = CertificationMapper.DomaintoPersistence(
      certification,
      freelancerId
    );
    await prismaClient.certification.create({
      data: certificationData,
    });
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
  ): Promise<void> {
    const certificationData = CertificationMapper.DomaintoPersistence(
      certification,
      freelancerId
    );
    await prismaClient.certification.update({
      where: { id: certificationId },
      data: certificationData,
    });
  }
  async findById(certificationId: string): Promise<Certification | null> {
    console.log("Finding certification by ID:", certificationId);
    const certification = await prismaClient.certification.findUnique({
      where: { id: certificationId },
    });
    console.log("Certification found:", certification);
    return certification
      ? CertificationMapper.persistenceToDomain(certification)
      : null;
  }
}
