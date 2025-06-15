import { IEducationController } from "@/contexts/CoreContext/domain/interfaces/controllers/IEducationController";
import { IEducationDto } from "@/contexts/CoreContext/domain/interfaces/dtos/IEducationDto";
import { IEducationService } from "@/contexts/CoreContext/domain/interfaces/services/IEducationService";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class EducationController implements IEducationController {
  constructor(
    @inject("EducationService") private educationService: IEducationService
  ) {}

  public getAll = async (req: Request, res: Response): Promise<void> => {
    throw new Error("Method not implemented.");
  };
  public getById = async (req: Request, res: Response): Promise<void> => {
    throw new Error("Method not implemented.");
  };
  public create = async (req: Request, res: Response): Promise<void> => {
    throw new Error("Method not implemented.");
  };
  public update = async (req: Request, res: Response): Promise<void> => {
    throw new Error("Method not implemented.");
  };
  public deleteById = async (req: Request, res: Response): Promise<void> => {
    throw new Error("Method not implemented.");
  };
}
