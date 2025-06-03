import { Request, Response } from "express";
import { HealthService } from "../../../infrastructure/services/HealthService";

import { CheckDBHealthUseCase } from "../../../application/useCases/CheckDBHealthStatus";
import { CheckAPIHealthStatus } from "../../../application/useCases/CheckAPIHealthStatus";

const checkDBHealthUseCase = new CheckDBHealthUseCase();
const checkAPIHealthStatus = new CheckAPIHealthStatus();
const healthService = new HealthService(
  checkDBHealthUseCase,
  checkAPIHealthStatus
);

export default {
  async getHealthStatus(req: Request, res: Response) {
    try {
      const healthStatus = await healthService.getHealthStatus();
      console.log(healthStatus);
      if (healthStatus.dbStatus.isConnected) res.status(200).json(healthStatus);
      else throw new Error("DB is not connected");
    } catch (error: any) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },
};
