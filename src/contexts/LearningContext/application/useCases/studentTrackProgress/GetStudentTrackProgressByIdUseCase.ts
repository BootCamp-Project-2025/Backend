import { inject, injectable } from "tsyringe";
import { IStudentTrackProgressRepository } from "../../../domain/interfaces/IStudentTrackProgressRepository";
import IUseCase from "../../../domain/interfaces/IUseCase";
import { StudentTrackProgress } from "../../../domain/entities/StudentTrackProgress";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

@injectable()
export default class GetStudentTrackProgressByIdUseCase implements IUseCase<string, StudentTrackProgress | null> {
    constructor(
        @inject("IStudentTrackProgressRepository")
        private readonly repository: IStudentTrackProgressRepository
    ) { }

    async execute(id: string): Promise<StudentTrackProgress | null> {
        const result = await this.repository.findById(id);
        if (!result) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Student track progress not found");
        }
        return result;
    }
}
