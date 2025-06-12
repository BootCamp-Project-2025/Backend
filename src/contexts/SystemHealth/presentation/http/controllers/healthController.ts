import { Request, Response } from "express";
import { HealthService } from "../../../infrastructure/services/HealthService";

import { StatusCodes } from "http-status-codes";
import { ResponseService } from "../../../../Shared/application/services/ResponseService";
import { ErrorResponseEntity } from "../../../../Shared/domain/entity/ErrorResponseEntity";
import { SuccessResponseEntity } from "../../../../Shared/domain/entity/SuccessResponseEntity";
import { CheckAPIHealthStatus } from "../../../application/useCases/CheckAPIHealthStatus";
import { CheckDBHealthUseCase } from "../../../application/useCases/CheckDBHealthStatus";
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
    const healthStatus = await healthService.getHealthStatus();
    console.log(healthStatus);
    const response = new SuccessResponseEntity(healthStatus, StatusCodes.OK);
    ResponseService.send(res, response);
  },

  async saveSampleData(req: Request, res: Response) {
    try {
      console.log(req.body);
      const sampleContent = req.body;
      const sampleData = await healthService.saveSampleDataToDb(sampleContent);
      const response = new SuccessResponseEntity(
        sampleData,
        StatusCodes.CREATED,
        "Sample data saved successfully"
      );
      ResponseService.send(res, response);
    } catch (error) {
      console.log(error);
      const response = new ErrorResponseEntity();
      ResponseService.send(res, response);
    }
  },
};
