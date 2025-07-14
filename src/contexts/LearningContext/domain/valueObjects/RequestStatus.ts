import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

export enum RequestStatusEnum {
  PENDING = "PENDING",
  AVAILABLE = "AVAILABLE",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

interface RequestStatusProps {
  [status: string]: string;
}

export class RequestStatus extends ValueObject<RequestStatusProps> {
  private constructor(props: RequestStatusProps) {
    super(props);
  }

  public get value(): RequestStatusEnum {
    return this.props.status as RequestStatusEnum;
  }

  public static create(props: RequestStatusProps): RequestStatus {
    if (!props.status || typeof props.status !== "string") {
      throw new Error("Invalid request status");
    }

    if (
      !Object.values(RequestStatusEnum).includes(
        props.status as RequestStatusEnum
      )
    ) {
      throw new Error(
        `Invalid status. Must be one of: ${Object.values(RequestStatusEnum).join(", ")}`
      );
    }

    return new RequestStatus(props);
  }

  public static default(): RequestStatus {
    return new RequestStatus({ status: RequestStatusEnum.PENDING });
  }

  public isAvalilable(): boolean {
    return this.value === RequestStatusEnum.AVAILABLE;
  }

  public isAccepted(): boolean {
    return this.value === RequestStatusEnum.ACCEPTED;
  }
  public isPending(): boolean {
    return this.value === RequestStatusEnum.PENDING;
  }
  public isRejected(): boolean {
    return this.value === RequestStatusEnum.REJECTED;
  }
}
