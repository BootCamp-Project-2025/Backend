import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { Post } from "../../domain/entities/Posts";
import IPostRepository from "../../domain/interfaces/IPostRepository";
import PostMapper from "../../mappers/PostMapper";

export default class PostRepository implements IPostRepository {
  private postDbConnection = PrismaClient.p2PPost;

  async create(p2pCourseId: string, post: Post): Promise<Post> {
    const postDto = PostMapper.domainToDto(post);
    return PostMapper.dtoToDomain(
      await this.postDbConnection.create({
        data: { ...postDto, p2pCourseId: p2pCourseId },
      })
    );
  }

  async update(postId: string, post: Post): Promise<Post> {
    const postDto = PostMapper.domainToDto(post);
    return PostMapper.dtoToDomain(
      await this.postDbConnection.update({
        data: { ...postDto },
        where: { id: postId },
      })
    );
  }

  async delete(postId: string): Promise<void> {
    await this.postDbConnection.delete({ where: { id: postId } });
  }
}
