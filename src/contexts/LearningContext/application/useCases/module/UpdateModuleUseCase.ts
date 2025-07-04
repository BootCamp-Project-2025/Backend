import { IFreelancerRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository";
import { Module } from "@/contexts/LearningContext/domain/entities/Module";
import IModuleRepository from "@/contexts/LearningContext/domain/interfaces/IModuleRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export default class UpdateModuleUseCase implements IUseCase<Module, Module> {
  constructor(
    @inject("IModuleRepository")
    private readonly moduleRepository: IModuleRepository,
    @inject("IFreelancerRepository")
    private readonly freelancerRepository: IFreelancerRepository
  ) {}
  execute(newModule: Module): Promise<Module> {
    try {
      throw new Error("Method not implemented.");
    } catch (error) {
      console.error("Error in UpdateModuleUseCase:", error);
      throw error; // Re-throw the error after logging it
    }
  }
}
