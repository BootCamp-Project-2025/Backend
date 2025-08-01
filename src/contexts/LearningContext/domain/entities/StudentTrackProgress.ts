import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Entity } from "../../../Shared/domain/Entity";
import { VideoProgress } from "../valueObjects/VideoProgress";
import { EnrollmentId } from "@/contexts/CoreContext/domain/valueObjects/EnrollmentId";

export interface StudentTrackProgressProps {
  enrollmentId: EnrollmentId;
  lessonId: string;
  videoProgresses: VideoProgress[];
  resourcesCompleted: string[];
  completed: boolean;
  completedAt?: Date;
}

export class StudentTrackProgress extends Entity<StudentTrackProgressProps> {
  constructor(props: StudentTrackProgressProps, id?: UniqueEntityID) {
    if (!props.enrollmentId) throw new Error("Missing enrollmentId");
    super(props, id);
  }

  public static create(
    props: StudentTrackProgressProps,
    id?: UniqueEntityID
  ): StudentTrackProgress {
    return new StudentTrackProgress(
      {
        ...props,
        videoProgresses: props.videoProgresses ?? [],
        resourcesCompleted: props.resourcesCompleted ?? [],
        completed: props.completed ?? false,
        completedAt: props.completedAt ?? undefined,
      },
      id
    );
  }

  get enrollmentId(): string {
    return this.props.enrollmentId.toString();
  }

  get lessonId(): string {
    return this.props.lessonId;
  }

  get videoProgresses(): VideoProgress[] {
    return this.props.videoProgresses;
  }

  get resourcesCompleted(): string[] {
    return this.props.resourcesCompleted;
  }

  get completed(): boolean {
    return this.props.completed;
  }

  get completedAt(): Date | undefined {
    return this.props.completedAt;
  }

  public isCompleted(): boolean {
    return this.props.completed;
  }

  public getVideoCompletion(): boolean {
    if (this.props.videoProgresses.length === 0) return true;
    return this.props.videoProgresses.every((v) => v.completed);
  }

  public getResourceCompletion(totalPdfResources: number): boolean {
    if (totalPdfResources === 0) return true;
    return this.props.resourcesCompleted.length === totalPdfResources;
  }

  public setAsCompleted(totalPdfResources: number): void {
    if (
      this.getVideoCompletion() &&
      this.getResourceCompletion(totalPdfResources)
    ) {
      this.props.completed = true;
      this.props.completedAt = new Date();
    }
  }

  get id(): UniqueEntityID {
    return this._id;
  }
}
