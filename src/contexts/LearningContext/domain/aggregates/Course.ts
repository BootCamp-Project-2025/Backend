import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { AggregateRoot } from "../../../Shared/domain/AgregateRoot";
import { CourseName } from "../valueObjects/CourseName";
import { CourseField } from "../valueObjects/CourseField";
import { CourseRequirements } from "../valueObjects/CourseRequirements";
import { CourseDescription } from "../valueObjects/CourseDescription";
import { Modules } from "../OneToMany/Modules";

export interface CourseProps {
  name: CourseName;
  field?: CourseField;
  requirements?: CourseRequirements;
  description: CourseDescription;
  imgSrc: string;
  modules: Modules;
  time?: number;
}

type CoursePrimitiveProps = {
  name: string;
  id: string;
  field: string;
  requirements: string;
  time: number;
  description: string;
  imgSrc: string;
  modules?: [];
};

export class Course extends AggregateRoot<CourseProps> {
  private constructor(props: CourseProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: CourseProps, id?: UniqueEntityID): Course {
    return new Course(
      { ...props, modules: props.modules ? props.modules : Modules.create([]) },
      id
    );
  }

  public static createFromObject(
    props: CoursePrimitiveProps,
    id?: UniqueEntityID
  ): Course {
    const nameValue = CourseName.create({ name: props.name });
    const fieldValue = CourseField.create({ name: props.field });
    const requirementsValue = CourseRequirements.create({
      name: props.requirements,
    });
    const descriptionValue = CourseDescription.create({
      name: props.description,
    });

    const course: CourseProps = {
      name: nameValue,
      field: fieldValue,
      requirements: requirementsValue,
      description: descriptionValue,
      time: props.time,
      imgSrc: props.imgSrc,
      modules: Modules.create(props.modules ?? []),
    };
    return Course.create(course, id);
  }

  getName(): CourseName {
    return this.props.name;
  }

  getField(): CourseField {
    return this.props.field ?? CourseField.create({ field: "General" });
  }

  getRequirements(): CourseRequirements {
    return (
      this.props.requirements ??
      CourseRequirements.create({ requirements: "None" })
    );
  }

  getDescription(): CourseDescription {
    return this.props.description;
  }

  getImgSrc(): string {
    return this.props.imgSrc;
  }

  getModules(): Modules {
    return this.props.modules ?? Modules.create([]);
  }

  getTime(): number {
    return this.props.time ?? 0;
  }
}
