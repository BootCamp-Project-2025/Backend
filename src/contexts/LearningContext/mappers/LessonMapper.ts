import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { LessonDTO } from "../domain/dtos/LessonDTO";
import { Lesson } from "../domain/entities/Lesson";

export default class LessonMapper {
  static DtoToDomain(lessonDto: LessonDTO): Lesson {
    return Lesson.create(
      {
        title: lessonDto.title,
        description: lessonDto.description,
        videoUrls: lessonDto.videoUrls,
        resources: lessonDto.resources,
      },
      new UniqueEntityID(lessonDto.id)
    );
  }

  static DomainToDTO(lesson: Lesson): LessonDTO {
    return {
      id: lesson.id.toString(),
      title: lesson.props.title,
      description: lesson.props.description,
      videoUrls: lesson.props.videoUrls,
      resources: lesson.props.resources,
    };
  }
}
