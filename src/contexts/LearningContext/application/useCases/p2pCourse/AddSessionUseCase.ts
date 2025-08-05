import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";
import LiveSession from "@/contexts/LearningContext/domain/entities/LiveSession";
import ILiveSessionRepository from "@/contexts/LearningContext/domain/interfaces/ILiveSessionRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export default class AddSessionUseCase
  implements
    IUseCase<{ p2pCourse: P2PCourse; session: LiveSession }, LiveSession>
{
  constructor(
    @inject("ILiveSessionRepository")
    private readonly sessionRepository: ILiveSessionRepository
  ) {}
  async execute({
    p2pCourse,
    session,
  }: {
    p2pCourse: P2PCourse;
    session: LiveSession;
  }): Promise<LiveSession> {
    p2pCourse.addSession(session);
    return await this.sessionRepository.create(
      p2pCourse.id.toString(),
      session
    );
  }
}
