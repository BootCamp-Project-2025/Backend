import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

export interface CourseIdProps {
  value: UniqueEntityID;
}

export class CourseId extends ValueObject<CourseIdProps> {
  private constructor(props: CourseIdProps) {
    super(props);
  }

  public get value(): UniqueEntityID {
    return this.props.value;
  }

  public static create(id: UniqueEntityID): CourseId {
    if (!id) {
      throw new Error("Course ID is required.");
    }
    return new CourseId({ value: id });
  }
}
