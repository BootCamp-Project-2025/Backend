import { ICdnService } from "@/contexts/CoreContext/domain/interfaces/services/ICdnService";
import { Lesson } from "@/contexts/LearningContext/domain/entities/Lesson";
import ILessonRepository from "@/contexts/LearningContext/domain/interfaces/ILessonRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { LessonResource } from "@/contexts/LearningContext/domain/valueObjects/LessonResource";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export default class UpdateLessonUseCase implements IUseCase<Lesson, Lesson> {
  constructor(
    @inject("ILessonRepository")
    private readonly lessonRepository: ILessonRepository,
    @inject("ICdnService")
    private readonly cdnService: ICdnService
  ) {}
  async execute(lesson: Lesson): Promise<Lesson> {
    try {
      const existingLesson = await this.lessonRepository.findById(
        lesson.id.toString()
      );

      if (!existingLesson) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Lesson not found");
      }
      if (existingLesson.compareTo(lesson)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Lesson not changed");
      }

      let lessonUrls: LessonResource[] = [];

      const updatedResources = await Promise.all(
        lesson.props.resources.map(async (resource) => {
          if (resource.url.includes("temp")) {
            const url = await this.cdnService.updateFilePreset(resource.url);
            const newResource = LessonResource.create({
              url,
              name: resource.name,
            });
            await this.cdnService.deleteFile(resource.url);
            return newResource;
          } else {
            return resource;
          }
        })
      );

      lessonUrls = updatedResources;

      if (existingLesson.props.resources) {
        existingLesson.props.resources.forEach(async (res) => {
          await this.cdnService.deleteFile(res.url);
        });
      }

      lesson.updateResourcesUrl(lessonUrls);
      return await this.lessonRepository.update(lesson);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "error executing the update"
      );
    }
  }
}
