import { inject, injectable } from "tsyringe";
import { IDashboardRepository } from "../../domain/interfaces/repositories/IDashboardRepository";
import { User } from "../../domain/aggregates/User";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import {
  StudentDashboardStatsDto,
  TeacherDashboardStatsDto,
} from "../../domain/interfaces/dtos/DashboardDto";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";

@injectable()
export class GetDashboardUseCase {
  constructor(
    @inject("IDashboardRepository")
    private dashboardRepository: IDashboardRepository,
    @inject("IUserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(
    userId: string
  ): Promise<StudentDashboardStatsDto | TeacherDashboardStatsDto> {
    const dbUser: User | null = await this.userRepository.getById(userId);

    if (dbUser === null) {
      throw new ApiError(StatusCodes.NOT_FOUND, "user not found.");
    }

    const stats = await this.dashboardRepository.getStats(dbUser);

    if (!stats) {
      throw new ApiError(StatusCodes.NOT_FOUND, "stats not found");
    }

    return stats;
  }
}
