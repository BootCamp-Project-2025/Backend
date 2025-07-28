import { StudentTrackProgress } from "../domain/entities/StudentTrackProgress";
import { StudentTrackProgressDb, VideoProgressDb, ResourceCompletedDb } from "../domain/dtos/Dbtypes";
import { EnrollmentId } from "@/contexts/CoreContext/domain/valueObjects/EnrollmentId";
import { VideoProgress } from "../domain/valueObjects/VideoProgress";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ResourceCompleted } from "../domain/valueObjects/ResourceCompleted";

export class StudentTrackProgressMapper {
    static PersistenceToDomain(db: StudentTrackProgressDb): StudentTrackProgress {
        return StudentTrackProgress.create({
            enrollmentId: EnrollmentId.create(new UniqueEntityID(db.enrollmentId)),
            lessonId: db.lessonId,
            videoProgresses: db.videoProgresses.map(v =>
                VideoProgress.create({
                    url: v.url,
                    watchedSeconds: v.watchedSeconds,
                    completed: v.completed,
                })
            ),
            resourcesCompleted: db.resourcesCompleted.map(
                (resource) => ResourceCompleted.create({ url: resource.url }).url
            ),
            completed: db.completed,
            completedAt: db.completedAt || undefined,
        }, new UniqueEntityID(db.id));
    }

    static DomainToPersistence(entity: StudentTrackProgress): StudentTrackProgressDb {
        return {
            id: entity.id.toString(),
            enrollmentId: entity.enrollmentId.toString(),
            lessonId: entity.lessonId,
            completed: entity.completed,
            completedAt: entity.completedAt || null,
            videoProgresses: entity.videoProgresses.map(videoProgress => (
                VideoProgress.create({
                    url: videoProgress.url,
                    watchedSeconds: videoProgress.watchedSeconds,
                    completed: videoProgress.completed,
                })
            )),
            resourcesCompleted: entity.resourcesCompleted.map(url => (
                ResourceCompleted.create({
                    url,
                })
            )),
        };
    }
}
