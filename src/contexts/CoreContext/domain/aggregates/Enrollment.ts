import { CourseId } from "@/contexts/LearningContext/domain/valueObjects/CourseId";
import { UserId } from "../valueObjects/UserId";
import { AggregateRoot } from "@/contexts/Shared/domain/AgregateRoot";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

export enum EnrollmentStatus {
  ENROLLED = "enrolled",
  CANCELED = "canceled",
  COMPLETED = "completed",
}

interface EnrollmentProps {
  courseId: CourseId;
  userId: UserId;
  createdAt: Date;
  status: EnrollmentStatus;
}

export class Enrollment extends AggregateRoot<EnrollmentProps> {
  private constructor(props: EnrollmentProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: EnrollmentProps, id?: string): Enrollment {
    if (!props.courseId || !props.userId) {
      throw new Error("Course ID and User ID are required.");
    }
    return new Enrollment(props, id ? new UniqueEntityID(id) : undefined);
  }

  public cancel(): void {
    this.props.status = EnrollmentStatus.CANCELED;
  }

  public complete(): void {
    this.props.status = EnrollmentStatus.COMPLETED;
  }

  get courseId(): CourseId {
    return this.props.courseId;
  }

  get userId(): UserId {
    return this.props.userId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get status(): EnrollmentStatus {
    return this.props.status;
  }
}
