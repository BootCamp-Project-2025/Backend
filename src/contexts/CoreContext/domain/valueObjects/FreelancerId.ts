import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

interface FreelancerIdProps {
  value: string;
}

export class FreelancerId extends ValueObject<FreelancerIdProps> {
  private constructor(props: FreelancerIdProps) {
    super(props);
  }

  toString(): string {
    return this.props.value.toString();
  }

  public getValue(): string {
    return this.props.value;
  }

  public static creat(id: string): FreelancerId {
    return new FreelancerId({ value: id });
  }
}
