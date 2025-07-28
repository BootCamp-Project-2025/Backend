import { inject, injectable } from "tsyringe";
import { IStudentTrackProgressRepository } from "../../../domain/interfaces/IStudentTrackProgressRepository";
import IUseCase from "../../../domain/interfaces/IUseCase";
import { StudentTrackProgress } from "../../../domain/entities/StudentTrackProgress";
import { IEnrollmentRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IEnrollmentRepository";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

@injectable()
export default class CreateStudentTrackProgressUseCase
    implements IUseCase<{ trackProgress: StudentTrackProgress; enrollmentId: string }, void> {
    constructor(
        @inject("IStudentTrackProgressRepository")
        private readonly trackRepository: IStudentTrackProgressRepository,
        @inject("IEnrollmentRepository")
        private readonly enrollmentRepository: IEnrollmentRepository
    ) { }

    async execute({
        trackProgress,
        enrollmentId,
    }: {
        trackProgress: StudentTrackProgress;
        enrollmentId: string;
    }): Promise<void> {
        try {
            const enrollment = await this.enrollmentRepository.findById(enrollmentId);
            if (!enrollment)
                throw new ApiError(StatusCodes.NOT_FOUND, "Enrollment not found");
            return await this.trackRepository.create(trackProgress);
        } catch (error) {
            if (error instanceof ApiError) throw error;
            console.error(error);
            throw new ApiError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                "Error executing the create"
            );
        }
    }
}
