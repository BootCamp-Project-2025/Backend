import IRequestRepository from "@/contexts/CoreContext/domain/interfaces/repositories/IRequestRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { DeleteResourceEvent } from "@/contexts/Shared/domain/events/DeleteResourceEvent";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { globalEventDispatcher } from "@/eventRegister";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export default class DeleteRequestUseCase implements IUseCase<string, void> {
  constructor(
    @inject("IRequestRepository")
    private readonly repository: IRequestRepository
  ) { }
  async execute(requestId: string): Promise<void> {
    await this.checkIfRequestExist(requestId);
    console.log(`Deleting request with ID: ${requestId}`);
    await this.repository.delete(requestId);
    const event = new DeleteResourceEvent({
      resource: "requests",
      resourceId: requestId,
    });
    console.log(
      `Dispatching DeleteResourceEvent for request ID: ${event.payload}`
    );
    globalEventDispatcher.dispatch(event);
  }

  async checkIfRequestExist(requestId: string) {
    if (!(await this.repository.findById(requestId))) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Request does not exist");
    }
  }
}
