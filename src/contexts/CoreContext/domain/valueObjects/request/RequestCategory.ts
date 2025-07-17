import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface RequestCategoryProps {
  value: string;
}

export class RequestCategory extends ValueObject<RequestCategoryProps> {
  private constructor(props: RequestCategoryProps) {
    super(props);
  }

  public get value(): string {
    return this.props.value;
  }

  public static create(value: string): RequestCategory {
    if (!value || value.trim().length === 0) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Category cannot be empty");
    }
    return new RequestCategory({ value });
  }
}
