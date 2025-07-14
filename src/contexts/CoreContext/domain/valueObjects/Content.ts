import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

interface DescriptionProps {
  value: string;
}

export class Description extends ValueObject<DescriptionProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: DescriptionProps) {
    super(props);
  }

  private static isValidDescription(description: string): boolean {
    return description.trim().length > 50 && description.trim().length < 200;
  }

  public static create(description: string | null | undefined) {
    if (!description) {
      throw new Error("Description required");
    }

    if (!this.isValidDescription(description)) {
      throw new Error(
        "Invalid description: must be between 50 and 200 characters long"
      );
    }

    return new Description({ value: description });
  }
}
