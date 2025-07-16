import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface EstimationProps {
  value: number;
}

export class RequestEstimation extends ValueObject<EstimationProps> {
  private constructor(props: EstimationProps) {
    super(props);
  }

  public get value(): number {
    return this.props.value;
  }

  public static create(value: number): RequestEstimation {
    if (value <= 0 || value > 365) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Estimation must be between 1 and 365"
      );
    }

    return new RequestEstimation({ value });
  }
}
