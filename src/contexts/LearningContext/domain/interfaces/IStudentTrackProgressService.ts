import { Module } from "../entities/Module";
import { StudentTrackProgress } from "../entities/StudentTrackProgress";

export type StudentProgress = {
  progress: number;
  courseId: string;
  modules: Module[];
  studentTrackProgresses: StudentTrackProgress[];
};

export interface IStudentTrackProgressService {
  getByEnrollment(enrollmentId: string): Promise<StudentProgress>;

  getById(id: string): Promise<StudentTrackProgress>;

  create(
    trackProgress: StudentTrackProgress,
    enrollmentId: string
  ): Promise<void>;

  update(trackProgress: StudentTrackProgress): Promise<void>;

  delete(id: string): Promise<void>;
}
