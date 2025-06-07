import { Request, Response } from "express";
import { HealthService } from "../../../infrastructure/services/HealthService";

import { CheckDBHealthUseCase } from "../../../application/useCases/CheckDBHealthStatus";
import { CheckAPIHealthStatus } from "../../../application/useCases/CheckAPIHealthStatus";
import { SaveSampleData } from "../../../application/useCases/SaveSampleData";
import { ResponseHandler } from "../../../../../contexts/Shared/Domain/entity/ResponseHandler";
import { StatusCodes } from "http-status-codes";

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
    const healthStatus = await healthService.getHealthStatus();
    console.log(healthStatus);
    ResponseHandler.sendSuccess(res, healthStatus);
  },

  async saveSampleData(req: Request, res: Response) {
    try {
      console.log(req.body);
      const sampleContent = req.body;
      const sampleData = await healthService.saveSampleDataToDb(sampleContent);
      ResponseHandler.sendSuccess(
        res,
        sampleData,
        "Data saved successfully",
        StatusCodes.CREATED
      );
    } catch (error) {
      console.log(error);
      ResponseHandler.sendError(res, "Something went wrong");
    }
  },
};
