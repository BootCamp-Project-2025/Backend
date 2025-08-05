import { IDashboardController } from "@/contexts/CoreContext/domain/interfaces/controllers/IDashboardController";
import { IDashboardService } from "@/contexts/CoreContext/domain/interfaces/services/IDashboardService";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export class DashboardController implements IDashboardController {
  constructor(
    @inject("IDashboardService") private dashboardService: IDashboardService
  ) {}

  async getDashboardStats(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "User not authenticated");
      }

      const stats = await this.dashboardService.getDashboardStats(userId);

      const response = new SuccessResponseEntity(
        stats,
        StatusCodes.OK,
        "Stats retrieved successfully"
      );
      ResponseService.send(res, response);
    } catch (error) {
      if (error as ApiError) {
        throw error;
      } else {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "server error");
      }
    }
  }
}
