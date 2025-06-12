export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public errors: string[] = []
  ) {
    super(message);
  }
}

// Example:
// if (!user) {
//   throw new ApiError(404, 'User not found', ['The ID doesn't exist']);
// }
