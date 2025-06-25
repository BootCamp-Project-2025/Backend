import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

interface CourseCategoryProps {
  [category: string]: string;
}

export class CourseCategory extends ValueObject<CourseCategoryProps> {
  private constructor(props: CourseCategoryProps) {
    super(props);
  }

  public get value(): string {
    return this.props.category;
  }

  public static create(props: CourseCategoryProps): CourseCategory {
    return new CourseCategory(props);
  }
}
