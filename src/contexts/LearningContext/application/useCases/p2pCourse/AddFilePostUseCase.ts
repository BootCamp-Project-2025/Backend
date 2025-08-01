import { FilePost } from "@/contexts/LearningContext/domain/entities/FilePost";
import IFilePostRepository from "@/contexts/LearningContext/domain/interfaces/IFilePostRepository";
import IP2PCourseRepository from "@/contexts/LearningContext/domain/interfaces/IP2PCourseRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export default class AddFilePostUseCase
  implements IUseCase<{ p2pCourseId: string; filePost: FilePost }, FilePost>
{
  constructor(
    @inject("IP2PCourseRepository")
    private readonly p2pCourseRepository: IP2PCourseRepository,
    @inject("IFilePostRepository")
    private readonly filePostRepository: IFilePostRepository
  ) {}
  async execute({
    p2pCourseId,
    filePost,
  }: {
    p2pCourseId: string;
    filePost: FilePost;
  }): Promise<FilePost> {
    const p2pCourse = await this.p2pCourseRepository.findById(p2pCourseId);
    if (!p2pCourse) {
      throw new ApiError(StatusCodes.NOT_FOUND, "The course doesn't exist");
    }

    p2pCourse.addFilePost(filePost);

    const savedFilePost = await this.filePostRepository.create(
      p2pCourseId,
      filePost
    );

    return savedFilePost;
  }
}
