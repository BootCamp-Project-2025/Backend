import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

interface CreationDateProps {
  value: Date;
}

export class CreationDate extends ValueObject<CreationDateProps> {
  get value(): Date {
    return this.props.value;
  }

  private constructor(props: CreationDateProps) {
    super(props);
  }

  private static isValidDate(date: Date): boolean {
    const now = new Date();
    const min = new Date("2025-01-01");
    return date <= now && date >= min;
  }

  public static create(date: Date | null | undefined): CreationDate {
    if (!date) {
      throw new Error("Creation date required");
    }

    if (!this.isValidDate(date)) {
      throw new Error("Invalid creation date");
    }

    return new CreationDate({ value: date });
  }
}
