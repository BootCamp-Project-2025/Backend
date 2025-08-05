import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";
import ILiveSessionRepository from "@/contexts/LearningContext/domain/interfaces/ILiveSessionRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { inject, injectable } from "tsyringe";

@injectable()
export default class RemoveSessionUseCase
  implements IUseCase<{ p2pCourse: P2PCourse; sessionId: string }, void>
{
  constructor(
    @inject("ILiveSessionRepository")
    private readonly sessionRepository: ILiveSessionRepository
  ) {}

  async execute({
    p2pCourse,
    sessionId,
  }: {
    p2pCourse: P2PCourse;
    sessionId: string;
  }): Promise<void> {
    p2pCourse.deleteSession(new UniqueEntityID(sessionId));
    await this.sessionRepository.delete(sessionId);
  }
}
