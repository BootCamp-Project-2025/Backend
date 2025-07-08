import { ICertificationController } from "@/contexts/CoreContext/domain/interfaces/controllers/ICertificationController";
import { ICertificationService } from "@/contexts/CoreContext/domain/interfaces/services/ICertificationService";
import { CertificationMapper } from "@/contexts/CoreContext/mappers/CertificationMapper";
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
  ) {}

  async getAll(req: Request, res: Response): Promise<void> {
    const freelancerId = req.params.freelancerId;
    const certifications = (
      await this.certificationService.getAll(freelancerId)
    ).map((cert) => new CertificationMapper().mapDomainToDto(cert));
    const response = new SuccessResponseEntity(
      certifications,
      StatusCodes.OK,
      "Certifications retrieved successfully"
    );
    ResponseService.send(res, response);
  }

  async create(req: Request, res: Response): Promise<void> {
    const freelancerId = req.params.freelancerId;
    const certification = req.body;
    const data = await this.certificationService.create(
      certification,
      freelancerId
    );
    const datadto = new CertificationMapper().mapDomainToDto(data);
    const response = new SuccessResponseEntity(datadto, StatusCodes.CREATED);
    ResponseService.send(res, response);
  }

  async update(req: Request, res: Response): Promise<void> {
    const freelancerId = req.params.freelancerId;
    const certificationId = req.params.certificationId;
    const certification = req.body;
    const data = await this.certificationService.update(
      certificationId,
      certification,
      freelancerId
    );
    const datadto = new CertificationMapper().mapDomainToDto(data);
    const response = new SuccessResponseEntity(datadto, StatusCodes.OK);
    ResponseService.send(res, response);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const freelancerId = req.params.freelancerId;
    const certificationId = req.params.certificationId;
    await this.certificationService.delete(certificationId, freelancerId);
    const response = new SuccessResponseEntity(null, StatusCodes.NO_CONTENT);
    ResponseService.send(res, response);
  }
}
