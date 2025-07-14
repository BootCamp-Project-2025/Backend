import { IEnrollmentController } from "@/contexts/CoreContext/domain/interfaces/controllers/IEnrollmentController";
import { ICreateEnrollmentDto } from "@/contexts/CoreContext/domain/interfaces/dtos/enrollment/ICreateEnrollmentDto";
import { IEnrollmentService } from "@/contexts/CoreContext/domain/interfaces/services/IEnrollmentService";
import { EnrollmentMapper } from "@/contexts/CoreContext/mappers/EnrollmentMapper";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export class EnrollmentController implements IEnrollmentController {
  constructor(
    @inject("IEnrollmentService")
    private enrollmentService: IEnrollmentService
  ) { }

  createEnrollment = async (req: Request, res: Response): Promise<void> => {
    const enrollmentDto: ICreateEnrollmentDto = req.body;
    if (!enrollmentDto)
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Required fields aren't fulfilled"
      );
    console.log("Received enrollment DTO:", enrollmentDto);
    const enrollment = EnrollmentMapper.createDtoToDomain(enrollmentDto);
    const savedEnrollment = await this.enrollmentService.create(enrollment);
    const response = new SuccessResponseEntity(
      EnrollmentMapper.domainToDto(savedEnrollment),
      StatusCodes.CREATED
    );
    ResponseService.send(res, response);
  };
  cancelEnrollment = async (req: Request, res: Response): Promise<void> => {
    const enrollmentId = req.params.id;
    if (!enrollmentId)
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Required fields aren't fulfilled"
      );
    await this.enrollmentService.cancel(enrollmentId);
    const response = new SuccessResponseEntity(
      { message: "Enrollment canceled successfully" },
      StatusCodes.OK
    );
    ResponseService.send(res, response);
  };
}
