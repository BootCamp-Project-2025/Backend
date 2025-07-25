import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface P2PRemainingSessionProps {
  [remainingSession: string]: number;
}

export default class P2PRemainingSession extends ValueObject<P2PRemainingSessionProps> {
  private constructor(props: P2PRemainingSessionProps) {
    super(props);
  }

  public get value(): number {
    return this.props.status;
  }

  public static create(props: P2PRemainingSessionProps): P2PRemainingSession {
    if (props.remainingSession < 0) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "The number of session cant be negative"
      );
    }
    return new P2PRemainingSession(props);
  }
}
