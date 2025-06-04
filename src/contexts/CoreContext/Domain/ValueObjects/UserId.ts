import { ValueObject } from "@/contexts/Shared/Domain/ValueObject";
import { UniqueEntityID } from "@/contexts/Shared/Domain/UniqueEntityID";

interface UserIdProps {
  value: string;
}

export class UserId extends ValueObject<UserIdProps> {
  private constructor(props: UserIdProps) {
    super(props);
  }

  public static create(id: UniqueEntityID): UserId {
    return new UserId({ value: id.toString() });
  }

  public getValue(): string {
    return this.props.value;
  }
}
