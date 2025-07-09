import { StatusCodes } from "http-status-codes";

export class ApiError extends Error {
  constructor(
    public statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    message: string = "Internal server error",
    public errors: string[] = []
  ) {
    super(message);
  }
}

// Example:
// if (!user) {
//   throw new ApiError(404, 'User not found', ['The ID doesn't exist']);
// }
