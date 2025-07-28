import { StudentTrackProgress } from "../entities/StudentTrackProgress";

export interface IStudentTrackProgressRepository {
    create(trackProgress: StudentTrackProgress): Promise<void>;
    findById(id: string): Promise<StudentTrackProgress | null>;
    findByEnrollment(enrollmentId: string): Promise<StudentTrackProgress[] | []>;
    update(trackProgress: StudentTrackProgress): Promise<void>;
    delete(id: string): Promise<void>;
}
