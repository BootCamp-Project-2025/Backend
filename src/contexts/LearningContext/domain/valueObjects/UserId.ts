import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface userIdProps {
  [userId: string]: string;
}

export default class UserId extends ValueObject<userIdProps> {
  private constructor(props: userIdProps) {
    super(props);
  }

  public get value(): string {
    return this.props.userId;
  }

  public static create(props: userIdProps): UserId {
    this.validateTitleOrThrowApiError(props.userId);
    return new UserId(props);
  }

  private static validateTitleOrThrowApiError(userId: string) {
    if (!userId.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "userId must not be empty");
    }
  }
}
