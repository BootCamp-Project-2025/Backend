import {
  StudentDashboardStatsDto,
  TeacherDashboardStatsDto,
} from "../dtos/DashboardDto";

export interface IDashboardRepository {
  getStats(
    userId: string,
    role: string
  ): Promise<StudentDashboardStatsDto | TeacherDashboardStatsDto>;
}
