import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { LessonDTO } from "../domain/dtos/LessonDTO";
import { Lesson } from "../domain/entities/Lesson";
import { SyllabusSectionTitle } from "../domain/valueObjects/SyllabusSectionTitle";
import { LessonDescription } from "../domain/valueObjects/LessonDescription";
import { LessonVideoUrl } from "../domain/valueObjects/LessonVideoUrl";
import { LessonResource } from "../domain/valueObjects/LessonResource";

export default class LessonMapper {
  static DtoToDomain(lessonDto: LessonDTO): Lesson {
    return Lesson.create(
      {
        title: SyllabusSectionTitle.create({ title: lessonDto.title }),
        description: LessonDescription.create({
          description: lessonDto.description,
        }),
        videoUrls: lessonDto.videoUrls.map((url) =>
          LessonVideoUrl.create({ url: url })
        ),
        resources: lessonDto.resources.map((resource) =>
          LessonResource.create({ name: resource.name, url: resource.url })
        ),
        position: lessonDto.position,
      },
      new UniqueEntityID(lessonDto.id)
    );
  }

  static DomainToDto(lesson: Lesson): LessonDTO {
    return {
      id: lesson.id.toString(),
      title: lesson.props.title.value,
      description: lesson.props.description.value,
      videoUrls: lesson.props.videoUrls.map((videoUrl) => videoUrl.value),
      resources: lesson.props.resources.map((resource) => ({
        name: resource.name,
        url: resource.url,
      })),
      position: lesson.props.position,
    };
  }
}
