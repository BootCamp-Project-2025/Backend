import { ValueObject } from "@/contexts/Shared/Domain/ValueObject";

interface CourseDescriptionProps {
  [description: string]: string;
}

export class CourseDescription extends ValueObject<CourseDescriptionProps> {
  private constructor(props: CourseDescriptionProps) {
    super(props);
  }

  public get value(): string {
    return this.props.description;
  }

  public static create(props: CourseDescriptionProps): CourseDescription {
    if (!props.description || props.description.trim() === "") {
      throw new Error("Course description cannot be empty.");
    }
    return new CourseDescription(props);
  }
}
