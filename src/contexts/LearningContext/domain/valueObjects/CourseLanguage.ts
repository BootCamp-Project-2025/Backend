import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

interface CourseLanguageProps {
  [language: string]: string;
}

export class CourseLanguage extends ValueObject<CourseLanguageProps> {
  private constructor(props: CourseLanguageProps) {
    super(props);
  }

  public get value(): string {
    return this.props.language;
  }

  public static create(props: CourseLanguageProps): CourseLanguage {
    return new CourseLanguage(props);
  }
}
