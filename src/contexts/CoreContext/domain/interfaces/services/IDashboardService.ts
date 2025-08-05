import {
  StudentDashboardStatsDto,
  TeacherDashboardStatsDto,
} from "../dtos/DashboardDto";

export interface IDashboardService {
  getDashboardStats(
    user: string
  ): Promise<StudentDashboardStatsDto | TeacherDashboardStatsDto>;
}
