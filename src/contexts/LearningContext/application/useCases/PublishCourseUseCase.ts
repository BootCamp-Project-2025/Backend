import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { ICourseRepository } from "../../domain/interfaces/ICourseRepository";
import IUseCase from "../../domain/interfaces/IUseCase";
import { injectable, inject } from "tsyringe";
import { StatusCodes } from "http-status-codes";

@injectable()
export class PublishCourseUseCase implements IUseCase<string, boolean> {
  constructor(@inject("ICourseRepository") private repo: ICourseRepository) {}
  async execute(id: string): Promise<boolean> {
    try {
      return await this.repo.publish(id);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "error executing the publish"
      );
    }
  }
}
