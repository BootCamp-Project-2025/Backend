import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";
import IP2PCourseRepository from "@/contexts/LearningContext/domain/interfaces/IP2PCourseRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export default class GetByTeacherIdAndCourseIdUseCase
  implements IUseCase<{ p2pCourseId: string; userId: string }, P2PCourse>
{
  constructor(
    @inject("IP2PCourseRepository")
    private readonly p2pCourseRepository: IP2PCourseRepository
  ) {}
  async execute({
    p2pCourseId,
    userId,
  }: {
    p2pCourseId: string;
    userId: string;
  }): Promise<P2PCourse> {
    const p2pCourse = await this.p2pCourseRepository.findByTeacherIdAndCourseId(
      p2pCourseId,
      userId
    );
    if (!p2pCourse) {
      throw new ApiError(StatusCodes.NOT_FOUND, "There is no course");
    }
    return p2pCourse;
  }
}
