import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

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
      throw new ApiError(StatusCodes.BAD_REQUEST, "Status required");
    }

    return new ProposalStatus({ value: status });
  }

  public isRejected(): boolean {
    return this.value === ProposalStatusEnum.REJECTED;
  }

  public isAccepted(): boolean {
    return this.value === ProposalStatusEnum.ACCEPTED;
  }

  public isPending(): boolean {
    return this.value === ProposalStatusEnum.PENDING;
  }
}
