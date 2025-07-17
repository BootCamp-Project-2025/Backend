import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

export enum RequestStatusEnum {
  PENDING = "PENDING",
  AVAILABLE = "AVAILABLE",
  ACCEPTED = "ACCEPTED",
  CANCELED = "CANCELED",
}

interface RequestStatusProps {
  value: RequestStatusEnum;
}

export class RequestStatus extends ValueObject<RequestStatusProps> {
  private constructor(props: RequestStatusProps) {
    super(props);
  }

  public get value(): RequestStatusEnum {
    return this.props.value;
  }

  public static create(value: string): RequestStatus {
    if (
      !Object.values(RequestStatusEnum).includes(value as RequestStatusEnum)
    ) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        `Invalid request status: ${value}`
      );
    }

    return new RequestStatus({ value: value as RequestStatusEnum });
  }

  public static default(): RequestStatus {
    return new RequestStatus({ value: RequestStatusEnum.PENDING });
  }

  public isAvailable(): boolean {
    return this.value === RequestStatusEnum.AVAILABLE;
  }

  public isAccepted(): boolean {
    return this.value === RequestStatusEnum.ACCEPTED;
  }

  public isPending(): boolean {
    return this.value === RequestStatusEnum.PENDING;
  }

  public isCanceled(): boolean {
    return this.value === RequestStatusEnum.CANCELED;
  }
}
