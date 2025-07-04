import { Request, Response } from "express";

import IModuleController from "@/contexts/LearningContext/domain/interfaces/IModuleController";
import IModuleService from "@/contexts/LearningContext/domain/interfaces/IModuleService";
import { inject, injectable } from "tsyringe";
import { ModuleDTO } from "@/contexts/LearningContext/domain/dtos/ModuleDTO";
import { Module } from "@/contexts/LearningContext/domain/entities/Module";
import ModuleMapper from "@/contexts/LearningContext/mappers/ModuleMapper";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { StatusCodes } from "http-status-codes";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";

@injectable()
export default class ModuleController implements IModuleController {
  constructor(
    @inject("IModuleService") private readonly moduleService: IModuleService
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    const moduleDto: ModuleDTO = req.body as ModuleDTO;
    const module: Module = ModuleMapper.DtoToDomain(moduleDto);
    const moduleDomain: Module = await this.moduleService.create(module);
    const resposeData = ModuleMapper.DomainToDto(moduleDomain);
    const response = new SuccessResponseEntity(
      resposeData,
      StatusCodes.CREATED,
      "Module saved successfully"
    );
    ResponseService.send(res, response);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const moduleId: string = req.params.freelancerId;
    await this.moduleService.delete(moduleId);
    const response = new SuccessResponseEntity(
      {},
      StatusCodes.OK,
      "Module deleted successfully"
    );
    ResponseService.send(res, response);
  }

  async update(req: Request, res: Response): Promise<void> {
    const moduleDto: ModuleDTO = req.body as ModuleDTO;
    moduleDto.id = req.params.moduleId;
    console.log("ModuleDto", moduleDto);
    const module: Module = ModuleMapper.DtoToDomain(moduleDto);
    const responseDomain: Module = await this.moduleService.update(module);
    const resposeData = ModuleMapper.DomainToDto(responseDomain);
    const response = new SuccessResponseEntity(
      resposeData,
      StatusCodes.OK,
      "Module updated successfully"
    );
    ResponseService.send(res, response);
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const freelancerString: string = req.params.freelancerId;
    const resposeDomain = await this.moduleService.getAll(freelancerString);
    const resposeData = ModuleMapper.bulkDomainToDto(resposeDomain);
    const response = new SuccessResponseEntity(
      resposeData,
      StatusCodes.OK,
      "Obtained modules successfully"
    );
    ResponseService.send(res, response);
  }
}
