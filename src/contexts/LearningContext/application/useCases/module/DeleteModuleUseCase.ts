import IModuleRepository from "@/contexts/LearningContext/domain/interfaces/IModuleRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export default class DeleteModuleUseCase implements IUseCase<string, void> {
  constructor(
    @inject("IModuleRepository")
    private readonly moduleRepository: IModuleRepository
  ) {}
  async execute(moduleId: string): Promise<void> {
    try {
      await this.moduleRepository.delete(moduleId);
    } catch (error) {
      console.error("Error in UpdateModuleUseCase:", error);
      throw error; // Re-throw the error after logging it
    }
  }
}
