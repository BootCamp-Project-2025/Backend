import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { P2PCourse } from "../../domain/aggregates/P2PCourse";
import IP2PCourseRepository from "../../domain/interfaces/IP2PCourseRepository";
import P2PCourseMapper from "../../mappers/P2PCourseMapper";

export default class P2PCourseRepository implements IP2PCourseRepository {
  private p2pCourseDbConnection = PrismaClient.p2PCourse;

  async create(p2pCourse: P2PCourse): Promise<P2PCourse> {
    const p2pCourseDto = P2PCourseMapper.domainToDto(p2pCourse);
    const p2pCourseDb = await this.p2pCourseDbConnection.create({
      data: {
        ...p2pCourseDto,
        sessions: { createMany: { data: p2pCourseDto.sessions } },
        files: { createMany: { data: p2pCourseDto.files } },
        posts: { createMany: { data: p2pCourseDto.posts } },
      },
      include: { sessions: true, files: true, posts: true },
    });
    return P2PCourseMapper.dtoToDomain(p2pCourseDb);
  }
  async findById(p2pCourseId: string): Promise<P2PCourse | null> {
    const p2pCourse = await this.p2pCourseDbConnection.findUnique({
      where: { id: p2pCourseId },
      include: { posts: true, files: true, sessions: true },
    });
    if (!p2pCourse) {
      return null;
    }
    return P2PCourseMapper.dtoToDomain(p2pCourse);
  }
  async findByUserIdAndCourseId(
    p2pCourseId: string,
    userId: string
  ): Promise<P2PCourse | null> {
    const p2pCourse = await this.p2pCourseDbConnection.findUnique({
      where: {
        id: p2pCourseId,
        OR: [{ teacherId: userId }, { studentId: userId }],
      },
      include: { posts: true, files: true, sessions: true },
    });
    if (!p2pCourse) {
      return null;
    }
    return P2PCourseMapper.dtoToDomain(p2pCourse);
  }
}
