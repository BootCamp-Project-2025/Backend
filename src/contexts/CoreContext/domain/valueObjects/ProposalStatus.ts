import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

export enum ProposalStatusEnum {
  REJECTED = "REJECTED",
  ACCEPTED = "ACCEPTED",
  PENDING = "PENDING",
}

interface StatusProps {
  value: ProposalStatusEnum;
}

export class ProposalStatus extends ValueObject<StatusProps> {
  get value(): ProposalStatusEnum {
    return this.props.value;
  }

  private constructor(props: StatusProps) {
    super(props);
  }

  public static create(status: ProposalStatusEnum | null | undefined) {
    if (!status) {
      throw new Error("Status required");
    }

    return new ProposalStatus({ value: status });
  }
}
