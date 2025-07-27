import { StudentTrackProgress } from "../entities/StudentTrackProgress";
import { VideoProgressProps } from "../valueObjects/VideoProgress";

export interface IStudentTrackProgressService {
    trackVideoProgress(enrollmentId: string, lessonId: string, video: VideoProgressProps): Promise<StudentTrackProgress>;
    completeResource(enrollmentId: string, lessonId: string, resourceId: string): Promise<StudentTrackProgress>;
    getProgress(enrollmentId: string, lessonId: string): Promise<StudentTrackProgress | null>;
    markAsCompleted(enrollmentId: string, lessonId: string): Promise<StudentTrackProgress>;
}
