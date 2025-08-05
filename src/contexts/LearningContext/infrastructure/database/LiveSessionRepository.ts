import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import LiveSession from "../../domain/entities/LiveSession";
import ILiveSessionRepository from "../../domain/interfaces/ILiveSessionRepository";
import SessionMapper from "../../mappers/SessionMapper";

export default class LiveSessionRepository implements ILiveSessionRepository {
  private liveSessionDbConnection = PrismaClient.liveSession;
  private p2pCourseDbConnection = PrismaClient.p2PCourse;
  async create(
    p2pCourseId: string,
    session: LiveSession
  ): Promise<LiveSession> {
    const sessionDb = SessionMapper.domainToDto(session);
    return SessionMapper.dtoToDomain(
      await this.liveSessionDbConnection.create({
        data: { ...sessionDb, p2pCourseId },
      })
    );
  }
  async update(sessionId: string, session: LiveSession): Promise<LiveSession> {
    const sessionDb = SessionMapper.domainToDto(session);
    return SessionMapper.dtoToDomain(
      await this.liveSessionDbConnection.update({
        data: sessionDb,
        where: { id: sessionId },
      })
    );
  }
  async delete(sessionId: string): Promise<void> {
    await this.liveSessionDbConnection.delete({ where: { id: sessionId } });
  }

  async completeSession(
    p2pCourseId: string,
    sessionId: string
  ): Promise<LiveSession> {
    await this.p2pCourseDbConnection.update({
      data: {
        remainingSession: { decrement: 1 },
      },
      where: { id: p2pCourseId },
    });
    return SessionMapper.dtoToDomain(
      await this.liveSessionDbConnection.update({
        data: { status: "COMPLETED" },
        where: { id: sessionId },
      })
    );
  }
}
