import { P2PCourse } from "../domain/aggregates/P2PCourse";
import { P2PCourseDTO } from "../domain/dtos/P2PCourseDTO";
import FilePostMapper from "./FilePostMapper";
import PostMapper from "./PostMapper";
import SessionMapper from "./SessionMapper";

const P2PCourseMapper = {
  dtoToDomain(p2pCourseDTO: P2PCourseDTO): P2PCourse {
    return P2PCourse.createFromPrimitive(p2pCourseDTO, p2pCourseDTO.id);
  },

  domainToDto(p2pCourse: P2PCourse): P2PCourseDTO {
    return {
      id: p2pCourse.id.toString(),
      studentId: p2pCourse.studentId,
      teacherId: p2pCourse.teacherId,
      chatId: p2pCourse.chatId,
      name: p2pCourse.name.value,
      remainingSession: p2pCourse.remainingSessions.value,
      status: p2pCourse.status.value,
      posts: p2pCourse.posts.map(PostMapper.domainToDto),
      files: p2pCourse.files.map(FilePostMapper.domainToDto),
      sessions: p2pCourse.sessions.map(SessionMapper.domainToDto),
    };
  },
};

export default P2PCourseMapper;
