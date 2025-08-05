import LiveSession from "../entities/LiveSession";

export default interface ILiveSessionRepository {
  create(p2pCourseId: string, session: LiveSession): Promise<LiveSession>;
  update(sessionId: string, session: LiveSession): Promise<LiveSession>;
  completeSession(p2pCourseId: string, sessionId: string): Promise<LiveSession>;
  delete(sessionId: string): Promise<void>;
}
