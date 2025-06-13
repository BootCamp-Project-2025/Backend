import { ICertificationController } from "@/contexts/CoreContext/domain/interfaces/controllers/ICertificationController";
import { ICertificationService } from "@/contexts/CoreContext/domain/interfaces/services/ICertificationService";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class CertificationController implements ICertificationController {
  constructor(
    @inject("ICertificationService")
    private readonly certificationService: ICertificationService
  ) { }

  async getByFreelancerId(req: Request, res: Response): Promise<void> {
    const freelancerId = req.params.id;
    const certifications =
      await this.certificationService.getByFreelancerId(freelancerId);
    if (!certifications) {
      throw new Error("Certifications not found");
    }

    res.status(200).json(certifications);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const certificationId = req.params.id;
    const certification =
      await this.certificationService.getById(certificationId);
    if (!certification) {
      throw new Error("Certification not found");
    }

    res.status(200).json(certification);
  }

  async create(req: Request, res: Response): Promise<void> {
    const freelancerId = req.params.id;
    const certification = req.body;
    await this.certificationService.create(certification, freelancerId);
    res.status(201).send();
  }

  async update(req: Request, res: Response): Promise<void> {
    const freelancerId = req.params.id;
    const certificationId = req.params.certificationId;
    const certification = req.body;
    await this.certificationService.update(
      certificationId,
      certification,
      freelancerId
    );
    res.status(204).send();
  }

  async delete(req: Request, res: Response): Promise<void> {
    const certificationId = req.params.id;
    await this.certificationService.delete(certificationId);
    res.status(204).send();
  }
}
