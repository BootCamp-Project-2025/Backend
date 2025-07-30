import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

export type P2PStatusType = "ACTIVE" | "CANCELED" | "COMPLETED";

interface P2PCourseStatusProps {
  [status: string]: P2PStatusType;
}

export default class P2PCourseStatus extends ValueObject<P2PCourseStatusProps> {
  private constructor(props: P2PCourseStatusProps) {
    super(props);
  }

  public get value(): P2PStatusType {
    return this.props.status;
  }

  public static create(props: P2PCourseStatusProps): P2PCourseStatus {
    if (!props.status || props.status.trim() === "") {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Status cannot be empty.");
    }
    return new P2PCourseStatus(props);
  }
}
