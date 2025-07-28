import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

interface EnrollmentIdProps {
  value: UniqueEntityID;
}

export class EnrollmentId extends ValueObject<EnrollmentIdProps> {
  private constructor(props: EnrollmentIdProps) {
    super(props);
  }

  toString(): string {
    return this.props.value.toString();
  }

  public getValue(): UniqueEntityID {
    return this.props.value;
  }

  public static create(id: UniqueEntityID): EnrollmentId {
    return new EnrollmentId({ value: id });
  }
}
