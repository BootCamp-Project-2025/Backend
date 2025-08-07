import { inject, injectable } from "tsyringe";
import {
  StudentDashboardStatsDto,
  TeacherDashboardStatsDto,
} from "../../domain/interfaces/dtos/DashboardDto";
import { IDashboardService } from "../../domain/interfaces/services/IDashboardService";
import { GetDashboardUseCase } from "../useCases/GetDashboardUseCase";

@injectable()
export class DashboardService implements IDashboardService {
  constructor(
    @inject("GetDashboardUseCase")
    private getDashboardUseCase: GetDashboardUseCase
  ) {}

  getDashboardStats(
    user: string,
    role: string
  ): Promise<StudentDashboardStatsDto | TeacherDashboardStatsDto> {
    return this.getDashboardUseCase.execute(user, role);
  }
}
