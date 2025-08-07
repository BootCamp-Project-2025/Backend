import {
  StudentDashboardStatsDto,
  TeacherDashboardStatsDto,
} from "../dtos/DashboardDto";

export interface IDashboardService {
  getDashboardStats(
    user: string,
    role: string
  ): Promise<StudentDashboardStatsDto | TeacherDashboardStatsDto>;
}
