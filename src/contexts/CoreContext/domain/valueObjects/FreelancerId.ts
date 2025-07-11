import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

interface FreelancerIdProps {
  value: UniqueEntityID;
}

export class FreelancerId extends ValueObject<FreelancerIdProps> {
  private constructor(props: FreelancerIdProps) {
    super(props);
  }

  toString(): string {
    return this.props.value.toString();
  }

  public getValue(): UniqueEntityID {
    return this.props.value;
  }

  public static creat(id: UniqueEntityID): FreelancerId {
    return new FreelancerId({ value: id });
  }
}
