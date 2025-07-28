import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface P2PRemainingSessionPropss {
  [remainingSession: string]: number;
}

export default class P2PRemainingSessions extends ValueObject<P2PRemainingSessionPropss> {
  private constructor(props: P2PRemainingSessionPropss) {
    super(props);
  }

  public get value(): number {
    return this.props.remainingSession;
  }

  public static create(props: P2PRemainingSessionPropss): P2PRemainingSessions {
    if (props.remainingSession < 0) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "The number of session cant be negative"
      );
    }
    return new P2PRemainingSessions(props);
  }
}
