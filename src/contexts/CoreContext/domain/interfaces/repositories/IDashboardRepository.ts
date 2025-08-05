import { User } from "../../aggregates/User";
import {
  StudentDashboardStatsDto,
  TeacherDashboardStatsDto,
} from "../dtos/DashboardDto";

export interface IDashboardRepository {
  getStats(
    user: User
  ): Promise<StudentDashboardStatsDto | TeacherDashboardStatsDto>;
}
