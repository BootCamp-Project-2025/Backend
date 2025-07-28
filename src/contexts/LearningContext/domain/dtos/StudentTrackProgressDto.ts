/* import { StudentTrackProgress } from "../entities/StudentTrackProgress"; */
import { VideoProgress } from "../valueObjects/VideoProgress";
import { ResourceCompleted } from "../valueObjects/ResourceCompleted";

export type StudentTrackProgressDto = {
    id?: string;
    enrollmentId?: string;
    lessonId?: string;
    videoProgresses?: {
        url?: string;
        watchedSeconds?: number;
        completed?: boolean;
    }[];
    resourcesCompleted?: {
        url?: string;
    }[];
    completed?: boolean;
    completedAt?: Date | null;
};

export class StudentTrackProgressDtoBuilder {
    private dto: StudentTrackProgressDto;

    constructor() {
        this.dto = {};
    }

    static builder() {
        return new StudentTrackProgressDtoBuilder();
    }

    id(id: string) {
        this.dto.id = id;
        return this;
    }

    enrollmentId(enrollmentId: string) {
        this.dto.enrollmentId = enrollmentId;
        return this;
    }

    lessonId(lessonId: string) {
        this.dto.lessonId = lessonId;
        return this;
    }

    videoProgresses(videoProgress: VideoProgress[]) {
        this.dto.videoProgresses = videoProgress.map(v => ({
            url: v.url,
            watchedSeconds: v.watchedSeconds,
            completed: v.completed,
        }));
        return this;
    }

    resourcesCompleted(resourcesCompleted: string[]) {
        this.dto.resourcesCompleted = resourcesCompleted.map(url => ({ url }));
        return this;
    }

    completed(completed: boolean) {
        this.dto.completed = completed;
        return this;
    }

    completedAt(completedAt?: Date) {
        this.dto.completedAt = completedAt;
        return this;
    }

    /* fromEntity(entity: StudentTrackProgress): this {
        return this
            .id(entity.id?.toString())
            .enrollmentId(entity.enrollmentId)
            .lessonId(entity.lessonId)
            .videoProgress(entity.videoProgress)
            .resourcesCompleted(entity.resourcesCompleted)
            .completed(entity.completed)
            .completedAt(entity.completedAt || undefined);
    } */

    build() {
        return this.dto;
    }
}
