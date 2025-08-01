import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";
import LiveSession from "@/contexts/LearningContext/domain/entities/LiveSession";
import ILiveSessionRepository from "@/contexts/LearningContext/domain/interfaces/ILiveSessionRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { inject, injectable } from "tsyringe";

@injectable()
export default class CompleteSessionUseCase
  implements IUseCase<{ p2pCourse: P2PCourse; sessionId: string }, LiveSession>
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
  }): Promise<LiveSession> {
    p2pCourse.completeSession(new UniqueEntityID(sessionId));
    const session = p2pCourse.getSession(new UniqueEntityID(sessionId));
    const savedSession = await this.sessionRepository.update(
      sessionId,
      session
    );
    return savedSession;
  }
}
