import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";
import IP2PCourseRepository from "@/contexts/LearningContext/domain/interfaces/IP2PCourseRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export default class GetP2PCoursesByUserIdUseCase
    implements IUseCase<string, P2PCourse[]> {
    constructor(
        @inject("IP2PCourseRepository")
        private readonly p2pCourseRepository: IP2PCourseRepository
    ) { }
    async execute(userId: string): Promise<P2PCourse[]> {
        const p2pCourses = await this.p2pCourseRepository.findByUserId(userId);
        if (p2pCourses.length === 0) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Courses not found");
        }
        return p2pCourses;
    }
}