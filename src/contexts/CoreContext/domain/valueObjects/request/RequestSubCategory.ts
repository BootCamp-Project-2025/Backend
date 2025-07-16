import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface SubcategoryProps {
  value: string;
}

export class RequestSubcategory extends ValueObject<SubcategoryProps> {
  private constructor(props: SubcategoryProps) {
    super(props);
  }

  public get value(): string {
    return this.props.value;
  }

  public static create(sub: string): RequestSubcategory {
    if (!sub || sub.trim().length === 0) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Subcategory cannot be empty"
      );
    }

    return new RequestSubcategory({ value: sub });
  }
}
