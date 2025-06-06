import { UniqueEntityID } from "../../Shared/Domain/UniqueEntityID";
import { Course as PrismaCourse } from "../../../generated/prisma/client";
import { Course, CourseProps } from "../Domain/Aggregates/Course";
import { CourseName } from "../Domain/valueObjects/CourseName";
import { CourseField } from "../Domain/valueObjects/CourseField";
import { CourseRequirements } from "../Domain/valueObjects/CourseRequirements";
import { CourseDescription } from "../Domain/valueObjects/CourseDescription";
import { CourseDTO } from "../Domain/dtos/CourseDTO";

export class CourseMapper {
  static toDomain(prismaCourse: PrismaCourse): Course {
    const nameValue = CourseName.create({ name: prismaCourse.name });
    const fieldValue = prismaCourse.field
      ? CourseField.create({ field: prismaCourse.field })
      : CourseField.create({ field: "Default" });

    const requirementsValue = prismaCourse.requirements
      ? CourseRequirements.create({ requirements: prismaCourse.requirements })
      : CourseRequirements.create({ requirements: "None" });
    const descriptionValue = CourseDescription.create({
      description: prismaCourse.description,
    });

    const course: CourseProps = {
      name: nameValue,
      field: fieldValue,
      requirements: requirementsValue,
      description: descriptionValue,

      time: prismaCourse.time,
      imgSrc: prismaCourse.imgSrc,
    };

    return Course.create(
      course,
      new UniqueEntityID(prismaCourse.id.toString())
    );
  }

  static toPersistence(domainCourse: Course): PrismaCourse {
    return {
      id: domainCourse.id.toString(),
      name: domainCourse.getName().value,
      field: domainCourse.getField().value,
      requirements: domainCourse.getRequirements().value,
      description: domainCourse.getDescription().value,
      time: domainCourse.getTime(),
      imgSrc: domainCourse.getImgSrc(),
    };
  }

  static toCreateDTO(body: Course): CourseDTO {
    return {
      name: body.props.name.value,
      description: body.props.description.value,
      imgSrc: body.props.imgSrc,
    };
  }
}
