import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";
import IP2PCourseRepository from "@/contexts/LearningContext/domain/interfaces/IP2PCourseRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject } from "tsyringe";

export default class GetP2PCourseByIdUseCase
  implements IUseCase<string, P2PCourse | null>
{
  constructor(
    @inject("IP2PCourseRepository")
    private readonly p2pCourseRepository: IP2PCourseRepository
  ) {}
  async execute(p2pCourseId: string): Promise<P2PCourse> {
    const p2pCourse = await this.p2pCourseRepository.findById(p2pCourseId);
    if (!p2pCourse) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Course not found");
    }
    return p2pCourse;
  }
}
