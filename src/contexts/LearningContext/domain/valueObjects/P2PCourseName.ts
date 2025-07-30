import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface P2PCourseNameProps {
  [name: string]: string;
}

export class P2PCourseName extends ValueObject<P2PCourseNameProps> {
  private constructor(props: P2PCourseNameProps) {
    super(props);
  }
  public get value(): string {
    return this.props.name;
  }

  public static create(props: P2PCourseNameProps): P2PCourseName {
    if (props.name.length < 5) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Name to short");
    }
    return new P2PCourseName(props);
  }
}
