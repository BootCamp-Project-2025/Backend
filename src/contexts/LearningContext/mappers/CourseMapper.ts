import { UniqueEntityID } from "../../Shared/domain/UniqueEntityID";
import { Course as PrismaCourse } from "../../../generated/prisma/client";
import { Course, CourseProps } from "../domain/aggregates/Course";
import { CourseName } from "../domain/valueObjects/CourseName";
import { CourseField } from "../domain/valueObjects/CourseField";
import { CourseRequirements } from "../domain/valueObjects/CourseRequirements";
import { CourseDescription } from "../domain/valueObjects/CourseDescription";
import { CourseDTO } from "../domain/dtos/CourseDTO";

export class CourseMapper {
  static toDomain(prismaCourse: PrismaCourse): Course {
    const nameValue = CourseName.create({ name: prismaCourse.name });
    const fieldValue = CourseField.create({ field: prismaCourse.field });
    const requirementsValue = CourseRequirements.create({
      requirements: prismaCourse.requirements,
    });
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

  static toAplicationDTO(domainCourse: Course): CourseDTO {
    return {
      name: domainCourse.props.name.value,
      description: domainCourse.props.description.value,
      imgSrc: domainCourse.props.imgSrc,
    };
  }
}
