import { UniqueEntityID } from "../../Shared/domain/UniqueEntityID";
import { Course as PrismaCourse } from "../../../generated/prisma/client";
import { Course, CourseProps } from "../domain/aggregates/Course";
import { CourseName } from "../domain/valueObjects/CourseName";
import { CourseField } from "../domain/valueObjects/CourseField";
import { CourseRequirements } from "../domain/valueObjects/CourseRequirements";
import { CourseDescription } from "../domain/valueObjects/CourseDescription";
import { CourseDTO } from "../domain/dtos/CourseDTO";
import { CourseCategory } from "../domain/valueObjects/CourseCategory";
import { CourseSubCategory } from "../domain/valueObjects/CourseSubCategory";
import { CourseLanguage } from "../domain/valueObjects/CourseLanguage";
import { UserId } from "@/contexts/CoreContext/domain/valueObjects/UserId";

export class CourseMapper {
  static toDomain(prismaCourse: PrismaCourse): Course {
    const courseProps: CourseProps = {
      name: CourseName.create({ name: prismaCourse.name }),
      field: CourseField.create({ field: prismaCourse.field ?? "" }),
      requirements: CourseRequirements.create({
        requirements: prismaCourse.requirements ?? "",
      }),
      description: CourseDescription.create({
        description: prismaCourse.description ?? "",
      }),
      time: prismaCourse.time ?? Date.now(),
      imgSrc: prismaCourse.imgSrc,
      category: CourseCategory.create({
        category: prismaCourse.category ?? "",
      }),
      subCategory: CourseSubCategory.create({
        subCategory: prismaCourse.subCategory ?? "",
      }),
      language: CourseLanguage.create({
        language: prismaCourse.language ?? "",
      }),
      userId: UserId.create(new UniqueEntityID(prismaCourse.userId))
    };

    return Course.create(
      courseProps,
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
      language: domainCourse.getLanguage().value,
      category: domainCourse.getCategory().value,
      subCategory: domainCourse.getSubCategory().value,
      userId: domainCourse.getUserID().toString(),
    };
  }

  static toCreateDTO(body: Course): CourseDTO {
    return {
      name: body.props.name.value,
      description: body.props.description.value,
      imgSrc: body.props.imgSrc,
      userId: body.props.userId.toString(),
    };
  }

  static toAplicationDTO(domainCourse: Course): CourseDTO {
    return {
      id: domainCourse.id.toString(),
      name: domainCourse.props.name.value,
      description: domainCourse.props.description.value,
      imgSrc: domainCourse.props.imgSrc,
      userId: domainCourse.props.userId.toString(),
    };
  }

  static dtoToDomain(courseDto: CourseDTO): Course {
    const courseProps: CourseProps = {
      name: CourseName.create({ name: courseDto.name }),
      field: CourseField.create({ field: courseDto.field ?? "" }),
      requirements: CourseRequirements.create({
        requirements: courseDto.requirements ?? "",
      }),
      description: CourseDescription.create({
        description: courseDto.description ?? "",
      }),
      time: courseDto.time ?? Date.now(),
      imgSrc: courseDto.imgSrc,
      category: CourseCategory.create({ category: courseDto.category ?? "" }),
      subCategory: CourseSubCategory.create({
        subCategory: courseDto.subCategory ?? "",
      }),
      language: CourseLanguage.create({ language: courseDto.language ?? "" }),
      userId: UserId.create(new UniqueEntityID(courseDto.userId))
    };
    if (courseDto.id !== null)
      return Course.create(courseProps, new UniqueEntityID(courseDto.id));
    return Course.create(courseProps);
  }
  static domainToDto(courseDto: Course): CourseDTO {
    return {
      id: courseDto.id.toString(),
      name: courseDto.props.name.value,
      description: courseDto.props.description.value,
      imgSrc: courseDto.props.imgSrc,
      category: courseDto.props.category?.value ?? "",
      subCategory: courseDto.props.subCategory?.value ?? "",
      language: courseDto.props.language?.value ?? "",
      field: courseDto.props.field?.value ?? "",
      time: courseDto.props.time,
      requirements: courseDto.props.requirements?.value ?? "",
      userId: courseDto.props.userId.toString(),
    };
  }
  static fromDTO(dto: CourseDTO): Course {
    const nameVO = CourseName.create({ name: dto.name });
    const descVO = CourseDescription.create({ description: dto.description });

    const props: CourseProps = {
      name: nameVO,
      description: descVO,
      imgSrc: dto.imgSrc,
      userId: UserId.create(new UniqueEntityID(dto.userId))
    };

    return Course.create(props, new UniqueEntityID(dto.id));
  }
}
