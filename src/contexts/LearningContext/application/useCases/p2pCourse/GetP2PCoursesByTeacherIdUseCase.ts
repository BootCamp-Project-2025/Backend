import { P2PCourseByTeacherDB } from "@/contexts/LearningContext/domain/dtos/Dbtypes";
import IP2PCourseRepository from "@/contexts/LearningContext/domain/interfaces/IP2PCourseRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export default class GetP2PCoursesByTeacherIdUseCase
    implements IUseCase<string, P2PCourseByTeacherDB[]> {
    constructor(
        @inject("IP2PCourseRepository")
        private readonly p2pCourseRepository: IP2PCourseRepository
    ) { }
    async execute(userId: string): Promise<P2PCourseByTeacherDB[]> {
        const p2pCourses = await this.p2pCourseRepository.findByTeacherId(userId);
        if (p2pCourses.length === 0) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Courses not found");
        }
        return p2pCourses;
    }
}