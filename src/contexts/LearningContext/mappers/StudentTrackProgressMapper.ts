import { StudentTrackProgress } from "../domain/entities/StudentTrackProgress";
import { StudentTrackProgressDto } from "../domain/dtos/StudentTrackProgressDto";
import { StudentTrackProgressDb } from "../domain/dtos/Dbtypes";
import { EnrollmentId } from "@/contexts/CoreContext/domain/valueObjects/EnrollmentId";
import { VideoProgress } from "../domain/valueObjects/VideoProgress";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ResourceCompleted } from "../domain/valueObjects/ResourceCompleted";
import { StudentProgress } from "../domain/interfaces/IStudentTrackProgressService";

const StudentTrackProgressMapper = {
  PersistenceToDomain(db: StudentTrackProgressDb): StudentTrackProgress {
    return StudentTrackProgress.create(
      {
        enrollmentId: EnrollmentId.create(new UniqueEntityID(db.enrollmentId)),
        lessonId: db.lessonId,
        videoProgresses: db.videoProgresses.map((v) =>
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
      },
      new UniqueEntityID(db.id)
    );
  },

  DomainToPersistence(entity: StudentTrackProgress): StudentTrackProgressDb {
    return {
      id: entity.id.toString(),
      enrollmentId: entity.enrollmentId.toString(),
      lessonId: entity.lessonId,
      completed: entity.completed,
      completedAt: entity.completedAt || null,
      videoProgresses: entity.videoProgresses.map((videoProgress) => ({
        url: videoProgress.url,
        watchedSeconds: videoProgress.watchedSeconds,
        completed: videoProgress.completed,
      })),
      resourcesCompleted: entity.resourcesCompleted.map((url) => ({
        url,
      })),
    };
  },

  DtoToDomain(dto: StudentTrackProgressDto): StudentTrackProgress {
    return StudentTrackProgress.create(
      {
        enrollmentId: EnrollmentId.create(new UniqueEntityID(dto.enrollmentId)),
        lessonId: dto.lessonId ?? "",
        videoProgresses:
          dto.videoProgresses?.map((v) =>
            VideoProgress.create({
              url: v.url,
              watchedSeconds: v.watchedSeconds,
              completed: v.completed,
            })
          ) ?? [],
        resourcesCompleted: dto.resourcesCompleted?.map((r) => r) ?? [],
        completed: dto.completed ?? false,
        completedAt: dto.completedAt || undefined,
      },
      dto.id ? new UniqueEntityID(dto.id) : undefined
    );
  },

  DomainToDto(entity: StudentTrackProgress): StudentTrackProgressDto {
    return {
      id: entity.id.toString(),
      enrollmentId: entity.enrollmentId.toString(),
      lessonId: entity.lessonId,
      videoProgresses: entity.videoProgresses.map((v) => ({
        url: v.url,
        watchedSeconds: v.watchedSeconds,
        completed: v.completed,
      })),
      resourcesCompleted: entity.resourcesCompleted.map((url) => url),
      completed: entity.completed,
      completedAt: entity.completedAt ?? null,
    };
  },

  DomaintoDataStudentProgres(studentProgress: StudentProgress) {
    const trackProgressMap = new Map(
      studentProgress.studentTrackProgresses.map((tp) => [
        tp.lessonId,
        {
          trackId: tp.id.toString(),
          enrollmentId: tp.enrollmentId.toString(),
          videoProgresses: tp.videoProgresses.map((vp) => ({
            url: vp.url,
            watchedSeconds: vp.watchedSeconds,
            completed: vp.completed,
          })),
          resourcesCompleted: tp.resourcesCompleted,
          completed: tp.completed,
          completedAt: tp.completedAt,
        },
      ])
    );

    return {
      progress: studentProgress.progress,
      courseName: studentProgress.courseName,
      courseId: studentProgress.courseId,
      modules: studentProgress.modules
        .map((module) => ({
          id: module.id.toString(),
          title: module.props.title.props.title,
          position: module.props.position,
          lessons: module.props.lessons.currentItems
            .map((lesson) => {
              const trackProgress = trackProgressMap.get(lesson.id.toString());

              return {
                id: lesson.id.toString(),
                title: lesson.props.title.props.title,
                description: lesson.props.description.props.description,
                position: lesson.props.position,
                videos: lesson.props.videoUrls.map((video) => ({
                  url: video.props.url,
                })),
                resources: lesson.props.resources.map((resource) => ({
                  name: resource.props.name,
                  url: resource.props.url,
                })),
                // Incluir el progreso directamente en cada lección
                progress: trackProgress || {
                  trackId: null,
                  enrollmentId:
                    studentProgress.studentTrackProgresses[0]?.enrollmentId.toString() ||
                    "",
                  videoProgresses: [],
                  resourcesCompleted: [],
                  completed: false,
                  completedAt: null,
                },
              };
            })
            .sort((a, b) => a.position - b.position),
        }))
        .sort((a, b) => a.position - b.position),
    };
  },
};

export default StudentTrackProgressMapper;
