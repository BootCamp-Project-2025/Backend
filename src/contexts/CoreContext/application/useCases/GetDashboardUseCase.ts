import { inject, injectable } from "tsyringe";
import { IDashboardRepository } from "../../domain/interfaces/repositories/IDashboardRepository";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import {
  StudentDashboardStatsDto,
  TeacherDashboardStatsDto,
} from "../../domain/interfaces/dtos/DashboardDto";

@injectable()
export class GetDashboardUseCase {
  constructor(
    @inject("IDashboardRepository")
    private dashboardRepository: IDashboardRepository
  ) {}

  async execute(
    userId: string,
    role: string
  ): Promise<StudentDashboardStatsDto | TeacherDashboardStatsDto> {
    const stats = await this.dashboardRepository.getStats(userId, role);

    if (!stats) {
      throw new ApiError(StatusCodes.NOT_FOUND, "stats not found");
    }

    return stats;
  }
}
