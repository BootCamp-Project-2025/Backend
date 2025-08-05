import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import {
  Role,
  StudentDashboardStatsDto,
  TeacherDashboardStatsDto,
} from "../../domain/interfaces/dtos/DashboardDto";
import { IDashboardRepository } from "../../domain/interfaces/repositories/IDashboardRepository";
import { DashboardMapper } from "../../mappers/DashboardMapper";
import { User } from "../../domain/aggregates/User";

export class DashboardRepository implements IDashboardRepository {
  async getStats(
    user: User
  ): Promise<StudentDashboardStatsDto | TeacherDashboardStatsDto> {
    if (user.roles.includes("CLIENT")) {
      return this.getStudentStats(user.id.toString());
    }

    if (user.roles.includes("FREELANCER")) {
      return this.getTeacherStats(user.id.toString());
    }

    throw new Error("Unsupported role for dashboard stats");
  }

  private async getStudentStats(userId: string) {
    const [coursesEnrolled, proposalsReceive] = await Promise.all([
      PrismaClient.enrollment.findMany({
        where: {
          userId: userId,
        },
      }),
      PrismaClient.proposal.findMany({
        where: {
          request: {
            userId: userId,
          },
        },
        orderBy: { createdAt: "desc" },
        take: 3,
        include: {
          user: true,
          request: {
            include: {
              user: true,
            },
          },
        },
      }),
    ]);

    const coursesNotCanceled = coursesEnrolled.filter(
      (row) => row.status !== "CANCELED"
    );
    const coursesCompleted = coursesEnrolled.filter(
      (row) => row.status === "COMPLETED"
    );
    const coursesCanceled = coursesEnrolled.filter(
      (row) => row.status === "CANCELED"
    );

    const enrolled = [];
    enrolled.push({
      title: "Courses Started",
      value: coursesNotCanceled.length,
    });
    enrolled.push({ title: "Courses Finish", value: coursesCompleted.length });
    enrolled.push({ title: "Courses Canceled", value: coursesCanceled.length });

    const proposals = DashboardMapper.mapProposals(proposalsReceive);

    const p2pCourses = await PrismaClient.p2PCourse.findMany({
      where: { studentId: userId },
      include: {
        teacher: {
          select: {
            userName: true,
          },
        },
        sessions: {
          select: { id: true },
        },
      },
    });

    const formattedP2pCourses =
      DashboardMapper.mapStudentP2PCourses(p2pCourses);

    const requests = await PrismaClient.request.findMany({
      where: { userId: userId },
      include: { proposals: true },
    });

    const requestStats = [];
    requestStats.push({ title: "Publications", value: requests.length });
    requestStats.push({
      title: "Proposals",
      value: requests.reduce((acc, row) => acc + row.proposals.length, 0),
    });
    requestStats.push({
      title: "Accepted",
      value: requests.filter((row) => row.status === "ACCEPTED").length,
    });

    const role: Role = "CLIENT";

    return {
      role: role,
      courses: enrolled,
      p2pCourses: formattedP2pCourses,
      requests: requestStats,
      proposals: proposals,
    };
  }

  private async getTeacherStats(userId: string) {
    const [totalCourses, proposalsSent, uniqueStudents] = await Promise.all([
      PrismaClient.course.findMany({
        where: { userId: userId },
      }),
      PrismaClient.proposal.findMany({
        where: { userId: userId },
        orderBy: { createdAt: "desc" },
        take: 3,
        include: {
          request: {
            include: {
              user: true,
            },
          },
        },
      }),
      PrismaClient.enrollment.findMany({
        where: {
          status: { not: "CANCELED" },
          course: { userId: userId },
        },
        distinct: ["userId"],
        select: { userId: true },
      }),
    ]);

    const publishedCourses = totalCourses.filter((row) => row.published);

    const courses = [];
    courses.push({ title: "Courses Created", value: totalCourses.length });
    courses.push({
      title: "Courses Published",
      value: publishedCourses.length,
    });
    courses.push({ title: "Students", value: uniqueStudents.length });

    const proposals = DashboardMapper.mapProposals(proposalsSent);

    const p2pCourses = await PrismaClient.p2PCourse.findMany({
      where: { teacherId: userId },
      include: {
        student: {
          select: {
            userName: true,
          },
        },
        sessions: {
          select: {
            id: true,
          },
        },
      },
    });

    const formattedP2pCourses =
      DashboardMapper.mapTeacherP2PCourses(p2pCourses);

    const role: Role = "FREELANCER";

    return {
      role: role,
      courses: courses,
      p2pCourses: formattedP2pCourses,
      proposals: proposals,
    };
  }
}
