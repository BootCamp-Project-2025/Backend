import { Request } from "express";
import { ApiError } from "../infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

export function getUserFromRequest(req: Request) {
  const user = req.user;
  if (!user || !user.id) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User info is not valid");
  }
  return user as {
    id: string;
    email: string;
    name: string;
  };
}
