import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

interface CourseSubCategoryProps {
  [subCategory: string]: string;
}

export class CourseSubCategory extends ValueObject<CourseSubCategoryProps> {
  private constructor(props: CourseSubCategoryProps) {
    super(props);
  }

  public get value(): string {
    return this.props.description;
  }

  public static create(props: CourseSubCategoryProps): CourseSubCategory {
    return new CourseSubCategory(props);
  }
}
