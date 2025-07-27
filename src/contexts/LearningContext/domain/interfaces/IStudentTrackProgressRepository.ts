import { StudentTrackProgress } from "../entities/StudentTrackProgress";

export interface IStudentTrackProgressRepository {
    create(trackProgress: StudentTrackProgress): Promise<void>;
    findById(id: string): Promise<StudentTrackProgress | null>;
    findByEnrollmentAndLesson(enrollmentId: string, lessonId: string): Promise<StudentTrackProgress | null>;
    update(trackProgress: StudentTrackProgress): Promise<void>;
    delete(id: string): Promise<void>;
}
