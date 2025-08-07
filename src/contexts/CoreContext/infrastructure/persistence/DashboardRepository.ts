import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import {
  StudentDashboardStatsDto,
  TeacherDashboardStatsDto,
} from "../../domain/interfaces/dtos/DashboardDto";
import { IDashboardRepository } from "../../domain/interfaces/repositories/IDashboardRepository";
import { DashboardMapper } from "../../mappers/DashboardMapper";

export class DashboardRepository implements IDashboardRepository {
  async getStats(
    userId: string,
    role: string
  ): Promise<StudentDashboardStatsDto | TeacherDashboardStatsDto> {
    if (role === "CLIENT") {
      return this.getStudentStats(userId);
    }

    if (role === "FREELANCER") {
      return this.getTeacherStats(userId);
    }

    throw new Error("Unsupported role for dashboard stats");
  }

  private async getStudentStats(userId: string) {
    const [
      coursesEnrolled,
      proposalsReceive,
      liveSession,
      requests,
      p2pCourses,
    ] = await Promise.all([
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
          status: {
            notIn: ["ACCEPTED", "REJECTED"],
          },
        },
        orderBy: { createdAt: "desc" },
        take: 3,
        select: {
          chatId: true,
          user: {
            select: {
              userName: true,
            },
          },
          request: {
            select: {
              title: true,
            },
          },
        },
      }),
      PrismaClient.liveSession.findMany({
        where: {
          p2pCourse: { studentId: userId },
          status: "COMPLETED",
        },
        select: { dateOfTheSession: true },
      }),
      PrismaClient.request.findMany({
        where: { userId: userId },
        include: { proposals: true },
      }),
      PrismaClient.p2PCourse.findMany({
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

    const proposals = DashboardMapper.mapStudentProposals(proposalsReceive);

    const formattedP2pCourses =
      DashboardMapper.mapStudentP2PCourses(p2pCourses);

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

    const enrolledPerMonth =
      DashboardMapper.groupByMonthByCreatedAt(coursesNotCanceled);
    const completedSessionsPerMonth =
      DashboardMapper.groupByMonthDateOfTheSession(liveSession);

    return {
      courses: enrolled,
      p2pCourses: formattedP2pCourses,
      requests: requestStats,
      proposals: proposals,
      coursesChart: enrolledPerMonth,
      p2pCoursesChart: completedSessionsPerMonth,
    };
  }

  private async getTeacherStats(userId: string) {
    const [
      totalCourses,
      proposalsSent,
      uniqueStudents,
      p2pCourses,
      courseEnrollments,
      p2pSessions,
    ] = await Promise.all([
      PrismaClient.course.findMany({
        where: { userId: userId },
      }),
      PrismaClient.proposal.findMany({
        where: {
          userId: userId,
          status: {
            notIn: ["ACCEPTED", "REJECTED"],
          },
        },
        orderBy: { createdAt: "desc" },
        take: 3,
        select: {
          chatId: true,
          request: {
            select: {
              title: true,
              user: {
                select: {
                  userName: true,
                },
              },
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
      PrismaClient.p2PCourse.findMany({
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
      }),
      PrismaClient.enrollment.findMany({
        where: { course: { userId } },
        select: { createdAt: true },
      }),
      PrismaClient.liveSession.findMany({
        where: {
          p2pCourse: { teacherId: userId },
          status: "COMPLETED",
        },
        select: { dateOfTheSession: true },
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

    const proposals = DashboardMapper.mapTeacherProposals(proposalsSent);

    const formattedP2pCourses =
      DashboardMapper.mapTeacherP2PCourses(p2pCourses);

    const studentEnrollmentsChart =
      DashboardMapper.groupByMonthByCreatedAt(courseEnrollments);
    const completedSessionsChart =
      DashboardMapper.groupByMonthDateOfTheSession(p2pSessions);

    return {
      courses: courses,
      p2pCourses: formattedP2pCourses,
      proposals: proposals,
      coursesChart: studentEnrollmentsChart,
      p2pCoursesChart: completedSessionsChart,
    };
  }
}
