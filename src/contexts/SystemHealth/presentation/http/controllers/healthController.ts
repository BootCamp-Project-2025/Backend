import { Request, Response } from "express";
import { HealthService } from "../../../infrastructure/services/HealthService";

import { CheckDBHealthUseCase } from "../../../application/useCases/CheckDBHealthStatus";
import { CheckAPIHealthStatus } from "../../../application/useCases/CheckAPIHealthStatus";
import { SaveSampleData } from "../../../application/useCases/SaveSampleData";

const checkDBHealthUseCase = new CheckDBHealthUseCase();
const checkAPIHealthStatus = new CheckAPIHealthStatus();
const saveSampleData = new SaveSampleData();
const healthService = new HealthService(
  checkDBHealthUseCase,
  checkAPIHealthStatus,
  saveSampleData
);

export default {
  async getHealthStatus(req: Request, res: Response) {
    try {
      const healthStatus = await healthService.getHealthStatus();
      console.log(healthStatus);
      if (healthStatus.dbStatus.isConnected) res.status(200).json(healthStatus);
      else throw new Error("DB is not connected");
    } catch (error) {
      res.status(500).json({ status: "error", error });
    }
  },

  async saveSampleData(req: Request, res: Response) {
    try {
      console.log(req.body);
      const sampleContent = req.body;
      const sampleData = await healthService.saveSampleDataToDb(sampleContent);
      res.status(201).json(sampleData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};
