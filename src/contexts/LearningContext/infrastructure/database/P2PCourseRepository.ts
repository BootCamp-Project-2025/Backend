import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { P2PCourse } from "../../domain/aggregates/P2PCourse";
import IP2PCourseRepository from "../../domain/interfaces/IP2PCourseRepository";
import P2PCourseMapper from "../../mappers/P2PCourseMapper";
import { P2PCourseByTeacherDB, P2PCourseDB } from "../../domain/dtos/Dbtypes";

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
  async findByUserId(userId: string): Promise<P2PCourseDB[]> {
    const p2pCourses = await this.p2pCourseDbConnection.findMany({
      where: {
        studentId: userId,
      },
      include: { posts: true, files: true, sessions: true, teacher: { select: { userName: true } } },
    });
    if (p2pCourses.length === 0) {
      return [];
    }
    const p2pCourseMany = p2pCourses.map((p2pCourse) => {
      return {
        id: p2pCourse.id,
        teacherId: p2pCourse.teacherId,
        chatId: p2pCourse.chatId,
        studentId: p2pCourse.studentId,
        name: p2pCourse.name,
        remainingSession: p2pCourse.remainingSession,
        status: p2pCourse.status,
        posts: p2pCourse.posts,
        files: p2pCourse.files,
        sessions: p2pCourse.sessions,
        teacherName: p2pCourse.teacher.userName
      }
    })

    return p2pCourseMany;
  }
  async findByTeacherId(userId: string): Promise<P2PCourseByTeacherDB[]> {
    const p2pCourses = await this.p2pCourseDbConnection.findMany({
      where: {
        teacherId: userId,
      },
      include: { posts: true, files: true, sessions: true, student: { select: { userName: true } } },
    });
    if (p2pCourses.length === 0) {
      return [];
    }
    const p2pCourseMany = p2pCourses.map((p2pCourse) => {
      return {
        id: p2pCourse.id,
        teacherId: p2pCourse.teacherId,
        chatId: p2pCourse.chatId,
        studentId: p2pCourse.studentId,
        name: p2pCourse.name,
        remainingSession: p2pCourse.remainingSession,
        status: p2pCourse.status,
        posts: p2pCourse.posts,
        files: p2pCourse.files,
        sessions: p2pCourse.sessions,
        studentName: p2pCourse.student.userName
      }
    })

    return p2pCourseMany;
  }
}
