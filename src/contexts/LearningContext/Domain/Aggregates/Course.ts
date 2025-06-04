import { UniqueEntityID } from "@/contexts/Shared/Domain/UniqueEntityID";
import { AggregateRoot } from "../../../Shared/Domain/AgregateRoot";
import Module from "module";

export interface CourseProps {
  name: string;
  field: string;
  imgSrc: string;
  requirements: string;
  modules?: Module[];
  time: number;
  description: string;
}

export class Course extends AggregateRoot<CourseProps> {
  private constructor(props: CourseProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: CourseProps, id?: UniqueEntityID): Course {
    return new Course(
      { ...props, modules: props.modules ? props.modules : [] },
      id
    );
  }

  getName(): string {
    return this.props.name;
  }

  getField(): string {
    return this.props.field;
  }

  getImgSrc(): string {
    return this.props.imgSrc;
  }

  getRequirements(): string {
    return this.props.requirements;
  }

  getModules(): Module[] {
    return this.props.modules ?? [];
  }

  getTime(): number {
    return this.props.time;
  }
}
