import { IEnrollmentService } from "../../domain/interfaces/services/IEnrollmentService";
import { inject, injectable } from "tsyringe";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Enrollment } from "../../domain/aggregates/Enrollment";
import { VideoProgress } from "@/contexts/LearningContext/domain/valueObjects/VideoProgress";
import { StudentTrackProgress } from "@/contexts/LearningContext/domain/entities/StudentTrackProgress";
import { EnrollmentId } from "../../domain/valueObjects/EnrollmentId";
import { Module } from "@/contexts/LearningContext/domain/entities/Module";

@injectable()
export class EnrollmentService implements IEnrollmentService {
  constructor(
    @inject("CreateEnrollmentUseCase")
    private createEnrollmentUseCase: IUseCase<Enrollment, Enrollment>,
    @inject("CancelEnrollmentUseCase")
    private cancelEnrollmentUseCAse: IUseCase<{ enrollmentId: string }, void>,
    @inject("GetAllModulesUseCase")
    private GetAllModulesUseCase: IUseCase<string, Module[]>,
    @inject("CreateStudentTrackProgressUseCase")
    private createStudentTrackProgressUseCase: IUseCase<
      { trackProgress: StudentTrackProgress; enrollmentId: string },
      void
    >
  ) {}

  async create(enrollment: Enrollment): Promise<Enrollment> {
    const createdEnrollment =
      await this.createEnrollmentUseCase.execute(enrollment);

    const modules = await this.GetAllModulesUseCase.execute(
      createdEnrollment.courseId.toString()
    );

    for (const module of modules) {
      const lessons = module.props.lessons.getItems();
      for (const lesson of lessons) {
        const trackProgress = StudentTrackProgress.create({
          enrollmentId: EnrollmentId.create(createdEnrollment.id),
          lessonId: lesson.id.toString(),
          videoProgresses: lesson.props.videoUrls.map((videoUrl) =>
            VideoProgress.create({
              url: videoUrl.value, // o simplemente videoUrl si no es value object
              watchedSeconds: 0,
              completed: false,
            })
          ),
          resourcesCompleted: [],
          completed: false,
        });
        await this.createStudentTrackProgressUseCase.execute({
          trackProgress,
          enrollmentId: createdEnrollment.id.toString(),
        });
      }
    }
    return createdEnrollment;
  }

  async cancel(enrollmentId: string): Promise<void> {
    await this.cancelEnrollmentUseCAse.execute({ enrollmentId });
  }
}
