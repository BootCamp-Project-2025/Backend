import { ICertificationController } from "@/contexts/CoreContext/domain/interfaces/controllers/ICertificationController";
import { ICertificationService } from "@/contexts/CoreContext/domain/interfaces/services/ICertificationService";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
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
    const response = new SuccessResponseEntity(
      certifications,
      StatusCodes.OK,
      "Certifications retrieved successfully"
    );
    ResponseService.send(res, response);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const certificationId = req.params.id;
    const certification =
      await this.certificationService.getById(certificationId);
    const response = new SuccessResponseEntity(
      certification,
      StatusCodes.OK,
      "Certification retrieved successfully"
    );
    ResponseService.send(res, response);
  }

  async create(req: Request, res: Response): Promise<void> {
    const freelancerId = req.params.id;
    const certification = req.body;
    await this.certificationService.create(certification, freelancerId);
    const response = new SuccessResponseEntity(
      null,
      StatusCodes.CREATED,
      "Certification created successfully"
    );
    ResponseService.send(res, response);
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
    const response = new SuccessResponseEntity(null, StatusCodes.NO_CONTENT);
    ResponseService.send(res, response);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const certificationId = req.params.certificationId;
    await this.certificationService.delete(certificationId);
    const response = new SuccessResponseEntity(null, StatusCodes.NO_CONTENT);
    ResponseService.send(res, response);
  }
}
