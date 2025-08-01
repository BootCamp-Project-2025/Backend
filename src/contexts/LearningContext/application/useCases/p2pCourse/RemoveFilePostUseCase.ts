import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";
import IFilePostRepository from "@/contexts/LearningContext/domain/interfaces/IFilePostRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { inject, injectable } from "tsyringe";

@injectable()
export default class RemoveFilePostUseCase
  implements IUseCase<{ p2pCourse: P2PCourse; filePostId: string }, void>
{
  constructor(
    @inject("IFilePostRepository")
    private readonly filePostRepository: IFilePostRepository
  ) {}
  async execute({
    p2pCourse,
    filePostId,
  }: {
    p2pCourse: P2PCourse;
    filePostId: string;
  }): Promise<void> {
    p2pCourse.deleteFilePost(new UniqueEntityID(filePostId));
    this.filePostRepository.delete(filePostId);
  }
}
