import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";
import IPostRepository from "@/contexts/LearningContext/domain/interfaces/IPostRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { inject, injectable } from "tsyringe";

@injectable()
export default class RemovePostUseCase
  implements IUseCase<{ p2pCourse: P2PCourse; postId: string }, void>
{
  constructor(
    @inject("IPostRepository") private readonly postRepository: IPostRepository
  ) {}
  async execute({
    p2pCourse,
    postId,
  }: {
    p2pCourse: P2PCourse;
    postId: string;
  }): Promise<void> {
    p2pCourse.deletePost(new UniqueEntityID(postId));
    await this.postRepository.delete(postId);
  }
}
