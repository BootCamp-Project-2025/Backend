import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

interface UserEmailProps {
  value: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserEmailProps) {
    super(props);
  }

  private static isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  private static format(email: string): string {
    return email.trim().toLowerCase();
  }

  public static create(email: string): UserEmail {
    if (!email || email.trim().length === 0) {
      throw new Error("Email is required");
    }

    const formatted = this.format(email);

    if (!this.isValidEmail(formatted)) {
      throw new Error("Email address not valid");
    }

    return new UserEmail({ value: formatted });
  }
}
