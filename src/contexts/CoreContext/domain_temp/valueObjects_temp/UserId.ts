import { ValueObject } from "@/contexts/Shared/Domain/ValueObject";
import { UniqueEntityID } from "@/contexts/Shared/Domain/UniqueEntityID";

interface UserIdProps {
  value: UniqueEntityID;
}

export class UserId extends ValueObject<UserIdProps> {
  private constructor(props: UserIdProps) {
    super(props);
  }

  toString(): string {
    return this.props.value.toString();
  }

  public getValue(): UniqueEntityID {
    return this.props.value;
  }

  public static create(id: UniqueEntityID): UserId {
    return new UserId({ value: id });
  }
}
