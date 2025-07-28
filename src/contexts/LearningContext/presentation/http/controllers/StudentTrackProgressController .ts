import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { StatusCodes } from "http-status-codes";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { IStudentTrackProgressController } from "@/contexts/LearningContext/domain/interfaces/IStudentTrackProgressController";
import { IStudentTrackProgressService } from "@/contexts/LearningContext/domain/interfaces/IStudentTrackProgressService";
import { StudentTrackProgressDto, StudentTrackProgressDtoBuilder } from "@/contexts/LearningContext/domain/dtos/StudentTrackProgressDto";
import { StudentTrackProgress } from "@/contexts/LearningContext/domain/entities/StudentTrackProgress";
import { StudentTrackProgressMapper } from "@/contexts/LearningContext/mappers/StudentTrackProgressMapper";

@injectable()
export default class StudentTrackProgressController implements IStudentTrackProgressController {
    constructor(
        @inject("IStudentTrackProgressService") private readonly studentTrackService: IStudentTrackProgressService
    ) { }

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const dto: StudentTrackProgressDto = req.body as StudentTrackProgressDto;
            const domain: StudentTrackProgress = StudentTrackProgressMapper.DtoToDomain(dto);

            await this.studentTrackService.create(domain, req.params.enrollmentId);

            const response = new SuccessResponseEntity(
                {},
                StatusCodes.CREATED,
                "Student track progress created successfully"
            );
            ResponseService.send(res, response);
        } catch (error) {
            if (error instanceof ApiError) throw error;
            console.error(error);
            throw new ApiError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                "Error accessing the student track service"
            );
        }
    };

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const dto: StudentTrackProgressDto = req.body as StudentTrackProgressDto;
            dto.id = req.params.trackId;
            const domain: StudentTrackProgress = StudentTrackProgressMapper.DtoToDomain(dto);

            await this.studentTrackService.update(domain);

            const response = new SuccessResponseEntity(
                {},
                StatusCodes.OK,
                "Student track progress updated successfully"
            );
            ResponseService.send(res, response);
        } catch (error) {
            if (error instanceof ApiError) throw error;
            console.error(error);
            throw new ApiError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                "Error updating student track progress"
            );
        }
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const id: string = req.params.trackId;
            await this.studentTrackService.delete(id);

            const response = new SuccessResponseEntity(
                {},
                StatusCodes.OK,
                "Student track progress deleted successfully"
            );
            ResponseService.send(res, response);
        } catch (error) {
            if (error instanceof ApiError) throw error;
            console.error(error);
            throw new ApiError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                "Error deleting student track progress"
            );
        }
    };

    getByEnrollment = async (req: Request, res: Response): Promise<void> => {
        try {
            const enrollmentId: string = req.params.enrollmentId;
            const result = await this.studentTrackService.getByEnrollment(enrollmentId);

            const response = new SuccessResponseEntity(
                result,
                StatusCodes.OK,
                "Student track progresses fetched successfully"
            );
            ResponseService.send(res, response);
        } catch (error) {
            if (error instanceof ApiError) throw error;
            console.error(error);
            throw new ApiError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                "Error fetching student track progresses"
            );
        }
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id: string = req.params.trackId;
            const result = await this.studentTrackService.getById(id);

            const response = new SuccessResponseEntity(
                result,
                StatusCodes.OK,
                "Student track progress fetched successfully"
            );
            ResponseService.send(res, response);
        } catch (error) {
            if (error instanceof ApiError) throw error;
            console.error(error);
            throw new ApiError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                "Error fetching student track progress"
            );
        }
    };
}
