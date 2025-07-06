import { inject, injectable } from "tsyringe";
import IModuleService from "../../domain/interfaces/IModuleService";
import { Module } from "../../domain/entities/Module";
import IUseCase from "../../domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

@injectable()
export default class ModuleService implements IModuleService {
  constructor(
    @inject("CreateModuleUseCase")
    private readonly createModuleUseCase: IUseCase<
      {
        module: Module;
        courseId: string;
      },
      Module
    >,
    @inject("DeleteModuleUseCase")
    private readonly deleteModuleUseCase: IUseCase<string, void>,
    @inject("UpdateModuleUseCase")
    private readonly updateModuleUseCase: IUseCase<Module, Module>,
    @inject("GetAllModulesUseCase")
    private readonly getAllModulesUseCase: IUseCase<string, Module[]>
  ) {}
  async create(module: Module, courseId: string): Promise<Module> {
    try {
      return await this.createModuleUseCase.execute({ module, courseId });
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error accesing the execution"
      );
    }
  }
  async delete(moduleId: string): Promise<void> {
    try {
      await this.deleteModuleUseCase.execute(moduleId);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error accesing the execution"
      );
    }
  }
  async update(module: Module): Promise<Module> {
    try {
      return await this.updateModuleUseCase.execute(module);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error accesing the execution"
      );
    }
  }
  async getAll(courseId: string): Promise<Module[]> {
    try {
      return await this.getAllModulesUseCase.execute(courseId);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error accesing the execution"
      );
    }
  }
}
