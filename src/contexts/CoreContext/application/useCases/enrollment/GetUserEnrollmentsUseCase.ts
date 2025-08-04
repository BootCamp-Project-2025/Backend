import { inject, injectable } from "tsyringe";
import { IEnrollmentRepository } from "../../../domain/interfaces/repositories/IEnrollmentRepository";
import { Enrollment } from "../../../domain/aggregates/Enrollment";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { IUserRepository } from "../../../domain/interfaces/repositories/IUserRepository";

@injectable()
export class GetUserEnrollmentsUseCase {
  constructor(
    @inject("IEnrollmentRepository")
    private readonly enrollmentRepo: IEnrollmentRepository,
    @inject("IUserRepository")
    private readonly userRepository: IUserRepository
  ) {}

  async execute(userId: string): Promise<Enrollment[]> {
    if (!userId) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "User ID is required.");
    }

    const userExists = await this.userRepository.getById(userId);
    if (!userExists) {
      throw new ApiError(StatusCodes.NOT_FOUND, "User not found.");
    }

    const enrollments = await this.enrollmentRepo.getByUserId(userId);
    return enrollments;
  }
}
