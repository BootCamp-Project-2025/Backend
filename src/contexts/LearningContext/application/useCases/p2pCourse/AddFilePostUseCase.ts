import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";
import { FilePost } from "@/contexts/LearningContext/domain/entities/FilePost";
import IFilePostRepository from "@/contexts/LearningContext/domain/interfaces/IFilePostRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export default class AddFilePostUseCase
  implements IUseCase<{ p2pCourse: P2PCourse; filePost: FilePost }, FilePost>
{
  constructor(
    @inject("IFilePostRepository")
    private readonly filePostRepository: IFilePostRepository
  ) {}
  async execute({
    p2pCourse,
    filePost,
  }: {
    p2pCourse: P2PCourse;
    filePost: FilePost;
  }): Promise<FilePost> {
    p2pCourse.addFilePost(filePost);

    const savedFilePost = await this.filePostRepository.create(
      p2pCourse.id.toString(),
      filePost
    );

    return savedFilePost;
  }
}
