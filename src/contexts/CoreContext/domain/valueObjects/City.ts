import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface CityProps {
  value: string;
}

export class City extends ValueObject<CityProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: CityProps) {
    super(props);
  }

  public static create(value: string): City {
    if (!value) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "City is required");
    }

    return new City({ value });
  }
}
