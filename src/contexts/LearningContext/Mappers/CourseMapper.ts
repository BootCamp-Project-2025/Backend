import { UniqueEntityID } from "../../Shared/Domain/UniqueEntityID";
import { Course as PrismaCourse } from "../../../generated/prisma/client";
import { Course, CourseProps } from "../domain/aggregates/Course";

export class CourseMapper {
  static toDomain(prismaCourse: PrismaCourse): Course {
    const course: CourseProps = {
      name: prismaCourse.name,
      field: prismaCourse.field,
      requirements: prismaCourse.requirements,
      time: prismaCourse.time,
      description: prismaCourse.description,
    };
    return new Course(course, new UniqueEntityID(prismaCourse.id.toString()));
  }

  static toPersistence(domainCourse: Course): PrismaCourse {
    return {
      id: domainCourse.id.toString(),
      name: domainCourse.props.name,
      field: domainCourse.props.field,
      requirements: domainCourse.props.requirements,
      time: domainCourse.props.time,
      description: domainCourse.props.description,
    };
  }
}
