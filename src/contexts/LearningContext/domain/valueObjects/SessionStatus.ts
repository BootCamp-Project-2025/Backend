import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

export type SessionStatusType = "COMPLETED" | "PENDING" | "CANCELED";

interface SessionStatusProps {
  [status: string]: SessionStatusType;
}

export default class SessionStatus extends ValueObject<SessionStatusProps> {
  private constructor(props: SessionStatusProps) {
    super(props);
  }

  public get value(): string {
    return this.props.status;
  }

  public static create(props: SessionStatusProps): SessionStatus {
    if (!props.status || props.status.trim() === "") {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Status cannot be empty.");
    }
    return new SessionStatus(props);
  }
}
