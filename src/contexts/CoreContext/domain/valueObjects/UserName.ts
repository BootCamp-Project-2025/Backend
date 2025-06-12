import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

interface UserNameProps {
  name: string;
}

export class UserName extends ValueObject<UserNameProps> {
  public static maxLength: number = 20;
  public static minLength: number = 4;

  get value(): string {
    return this.props.name;
  }

  private constructor(props: UserNameProps) {
    super(props);
  }

  public static create(name: string): UserName {
    if (!name || name.trim().length === 0) {
      throw new Error("Username is required");
    }

    if (name.length < this.minLength) {
      throw new Error(`Username must be at least ${this.minLength} characters`);
    }

    if (name.length > this.maxLength) {
      throw new Error(`Username must be at most ${this.maxLength} characters`);
    }

    return new UserName({ name });
  }
}
