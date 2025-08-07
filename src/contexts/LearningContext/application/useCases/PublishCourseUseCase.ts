import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { Module } from "../../domain/entities/Module";
import { ICourseRepository } from "../../domain/interfaces/ICourseRepository";
import IUseCase from "../../domain/interfaces/IUseCase";
import { injectable, inject } from "tsyringe";
import { StatusCodes } from "http-status-codes";
import { Modules } from "../../domain/OneToMany/Modules";
import { IndexResourceEvent } from "@/contexts/Shared/domain/events/IndexResourceEvent";
import { CourseMapper } from "../../mappers/CourseMapper";
import { globalEventDispatcher } from "@/eventRegister";
import { DeleteResourceEvent } from "@/contexts/Shared/domain/events/DeleteResourceEvent";

export interface PublishInput {
  id: string;
  published: boolean;
}

@injectable()
export class PublishCourseUseCase implements IUseCase<PublishInput, boolean> {
  constructor(
    @inject("ICourseRepository")
    private repo: ICourseRepository,
    @inject("GetAllModulesUseCase")
    private readonly getAllModulesUseCase: IUseCase<string, Module[]>
  ) {}

  async execute(input: PublishInput): Promise<boolean> {
    const { id, published } = input;
    const result = await this.repo.publish(id, published);
    const course = await this.repo.findById(id);

    if (!course) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Course not found");
    }

    if (published) {
      const modules = await this.getAllModulesUseCase.execute(id);
      course.props.modules = Modules.create(modules);

      const event = new IndexResourceEvent({
        resource: "course",
        resourceDto: CourseMapper.domainToIndex(course),
      });

      globalEventDispatcher.dispatch(event);
    } else {
      const deleteEvent = new DeleteResourceEvent({
        resource: "course",
        resourceId: id,
      });

      globalEventDispatcher.dispatch(deleteEvent);
    }
    return result;
  }
}
