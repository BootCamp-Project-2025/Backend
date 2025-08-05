import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";
import IP2PCourseRepository from "@/contexts/LearningContext/domain/interfaces/IP2PCourseRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export default class CreateP2PCourseUseCase
  implements IUseCase<P2PCourse, P2PCourse>
{
  constructor(
    @inject("IP2PCourseRepository")
    private readonly p2pCourseRepository: IP2PCourseRepository
  ) {}
  async execute(p2pCourse: P2PCourse): Promise<P2PCourse> {
    return await this.p2pCourseRepository.create(p2pCourse);
  }
}
