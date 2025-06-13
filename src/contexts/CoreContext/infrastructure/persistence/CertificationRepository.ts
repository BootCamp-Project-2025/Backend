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
    return certifications.map((cert) => CertificationMapper.toDomain(cert));
  }
  create(certification: Certification): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(certificationId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(certificationId: string, certification: Certification): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(certificationId: string): Promise<Certification | null> {
    throw new Error("Method not implemented.");
  }
}
