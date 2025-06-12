import { ValueObject } from "@/contexts/Shared/Domain/ValueObject";

interface AboutProps {
  value: string;
}

export class About extends ValueObject<AboutProps> {
  private static readonly MIN_LENGTH = 50;
  private static readonly MAX_LENGTH = 500;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: AboutProps) {
    super({ value: About.format(props.value) });
  }

  private static format(text: string): string {
    return text.trim();
  }

  public static create(text: string): About {
    const cleaned = this.format(text);

    /*if (cleaned.length < this.MIN_LENGTH) {
      throw new Error(`About must be at least ${this.MIN_LENGTH} characters.`);
    }*/

    if (cleaned.length > this.MAX_LENGTH) {
      throw new Error(`About must be less than ${this.MAX_LENGTH} characters.`);
    }

    return new About({ value: cleaned });
  }
}
