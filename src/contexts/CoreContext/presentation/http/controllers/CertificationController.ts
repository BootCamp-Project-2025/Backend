import { ICertificationController } from "@/contexts/CoreContext/domain/interfaces/controllers/ICertificationController";
import { ICertificationService } from "@/contexts/CoreContext/domain/interfaces/services/ICertificationService";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class CertificationController implements ICertificationController {
  constructor(
    @inject("ICertificationService")
    private readonly certificationService: ICertificationService
  ) {}

  async getByFreelancerId(req: Request, res: Response): Promise<void> {
    const freelancerId = req.params.id;
    const certifications =
      await this.certificationService.getByFreelancerId(freelancerId);
    if (!certifications) {
      throw new Error("Certifications not found");
    }

    res.status(200).json(certifications);
  }
}
