import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";
import { Post } from "@/contexts/LearningContext/domain/entities/Posts";
import IPostRepository from "@/contexts/LearningContext/domain/interfaces/IPostRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export default class AddPostUseCase
  implements IUseCase<{ p2pCourse: P2PCourse; post: Post }, Post>
{
  constructor(
    @inject("IPostRepository") private readonly postRepository: IPostRepository
  ) {}
  async execute({
    p2pCourse,
    post,
  }: {
    p2pCourse: P2PCourse;
    post: Post;
  }): Promise<Post> {
    p2pCourse.addPost(post);
    return await this.postRepository.create(p2pCourse.id.toString(), post);
  }
}
