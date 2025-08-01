import { FilePostDTO } from "./FilePostDTO";
import { PostDTO } from "./PostDTO";
import { SessionDTO } from "./SessionDTO";

export type P2PCourseDTO = {
  id?: string;
  studentId: string;
  teacherId: string;
  chatId: string;
  name: string;
  remainingSession: number;
  status: "ACTIVE" | "CANCELED" | "COMPLETED";
  posts: PostDTO[];
  files: FilePostDTO[];
  sessions: SessionDTO[];
};
