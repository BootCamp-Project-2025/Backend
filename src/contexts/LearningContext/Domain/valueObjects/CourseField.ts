import { ValueObject } from "../../../Shared/Domain/ValueObject";

interface CourseFieldProps {
  [field: string]: string;
}

export class CourseField extends ValueObject<CourseFieldProps> {
  private constructor(props: CourseFieldProps) {
    super(props);
  }

  public get value(): string {
    return this.props.field;
  }

  public static create(props: CourseFieldProps): CourseField {
    if (!props.field || typeof props.field !== "string") {
      throw new Error("Invalid field value");
    }
    return new CourseField(props);
  }
}
