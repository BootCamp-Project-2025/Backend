import prismaClient from "@/contexts/Shared/infrastrucutre/database/prismaClient";
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
    console.log("certifications", certifications);
    return certifications.map((cert) =>
      CertificationMapper.persistenceToDomain(cert)
    );
  }
  async create(
    certification: Certification,
    freelancerId: string
  ): Promise<void> {
    const certificationData = CertificationMapper.toPersistence(
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
    const certificationData = CertificationMapper.toPersistence(
      certification,
      freelancerId
    );
    await prismaClient.certification.update({
      where: { id: certificationId },
      data: certificationData,
    });
  }
  async findById(certificationId: string): Promise<Certification | null> {
    const certification = await prismaClient.certification.findUnique({
      where: { id: certificationId },
    });
    return certification
      ? CertificationMapper.persistenceToDomain(certification)
      : null;
  }
}
