import { SessionDTO } from "../domain/dtos/SessionDTO";
import LiveSession from "../domain/entities/LiveSession";

const SessionMapper = {
  dtoToDomain(sessionDto: SessionDTO): LiveSession {
    sessionDto.status = sessionDto.status;
    return LiveSession.createFromPrimitive(sessionDto, sessionDto.id);
  },
  domainToDto(session: LiveSession): SessionDTO {
    return {
      id: session.id.toString(),
      url: session.url.value,
      dateOfTheSession: session.dateOfTheSession,
      creationDate: session.creationDate,
      status: session.status.value,
    };
  },
};

export default SessionMapper;
