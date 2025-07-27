import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Entity } from "../../../Shared/domain/Entity";
import { VideoProgress } from "../valueObjects/VideoProgress";
import { EnrollmentId } from "@/contexts/CoreContext/domain/valueObjects/EnrollmentId";

export interface StudentTrackProgressProps {
    enrollmentId: EnrollmentId;
    lessonId: string;
    videoProgress: VideoProgress[];
    resourcesCompleted: string[];
    completed: boolean;
    completedAt?: Date;
}

export class StudentTrackProgress extends Entity<StudentTrackProgressProps> {

    constructor(props: StudentTrackProgressProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: StudentTrackProgressProps, id?: UniqueEntityID): StudentTrackProgress {
        return new StudentTrackProgress(
            {
                ...props,
                videoProgress: props.videoProgress ?? [],
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

    get videoProgress(): VideoProgress[] {
        return this.props.videoProgress;
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
        if (this.props.videoProgress.length === 0) return true;
        return this.props.videoProgress.every(v => v.completed);
    }

    public getResourceCompletion(totalPdfResources: number): boolean {
        if (totalPdfResources === 0) return true;
        return this.props.resourcesCompleted.length === totalPdfResources;
    }

    public setAsCompleted(totalPdfResources: number): void {
        if (this.getVideoCompletion() && this.getResourceCompletion(totalPdfResources)) {
            this.props.completed = true;
            this.props.completedAt = new Date();
        }
    }

    get id(): UniqueEntityID {
        return this._id;
    }
}
