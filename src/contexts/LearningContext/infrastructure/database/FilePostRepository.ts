import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { FilePost } from "../../domain/entities/FilePost";
import IFilePostRepository from "../../domain/interfaces/IFilePostRepository";
import FilePostMapper from "../../mappers/FilePostMapper";

export default class FilePostRepository implements IFilePostRepository {
  private filePostDbConnection = PrismaClient.p2PFilePost;

  async create(p2pCourseId: string, filePost: FilePost): Promise<FilePost> {
    const filePostDto = FilePostMapper.domainToDto(filePost);
    return FilePostMapper.dtoToDomain(
      await this.filePostDbConnection.create({
        data: { ...filePostDto, p2pCourseId: p2pCourseId },
      })
    );
  }

  async delete(filePostId: string): Promise<void> {
    await this.filePostDbConnection.delete({ where: { id: filePostId } });
  }
}
