import { DeleteResourceEvent } from "@/contexts/Shared/domain/events/DeleteResourceEvent";
import { ICourseRepository } from "../../domain/interfaces/ICourseRepository";
import IUseCase from "../../domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";
import { globalEventDispatcher } from "@/eventRegister";

@injectable()
export class DeleteCourseUseCase implements IUseCase<string, void> {
  constructor(
    @inject("ICourseRepository") private readonly courseRepo: ICourseRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.courseRepo.delete(id);
    const event = new DeleteResourceEvent({
      resource: "course",
      resourceId: id,
    });

    globalEventDispatcher.dispatch(event);
  }
}
