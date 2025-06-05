import { UniqueEntityID } from "../../Shared/Domain/UniqueEntityID";
import { Course as PrismaCourse } from "../../../generated/prisma/client";
import { Course, CourseProps } from "../Domain/Aggregates/Course";

export class CourseMapper {
  static toDomain(prismaCourse: PrismaCourse): Course {
    const courseProps: CourseProps = {
      name: prismaCourse.name,
      field: prismaCourse.field,
      requirements: prismaCourse.requirements,
      time: prismaCourse.time,
      description: prismaCourse.description,
    };
    return Course.create(
      courseProps,
      new UniqueEntityID(prismaCourse.id.toString())
    );
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
