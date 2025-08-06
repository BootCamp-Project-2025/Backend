import {
  ChartDataDto,
  CreateAtDateDto,
  DateOfTheSessionDateDto,
  P2PStudentCourseDto,
  P2PTeacherCourseDto,
  ProposalDto,
  TitleValueObjectDto,
} from "../domain/interfaces/dtos/DashboardDto";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
];

export class DashboardMapper {
  static mapStudentP2PCourses(
    courses: P2PStudentCourseDto[]
  ): TitleValueObjectDto[] {
    return courses.flatMap((course) => [
      {
        title: "",
        value: course.name,
      },
      {
        title: "",
        value: course.teacher?.userName ?? "Unknown",
      },
      {
        title: "Sessions",
        value: course.sessions.length,
      },
    ]);
  }

  static mapTeacherP2PCourses(
    courses: P2PTeacherCourseDto[]
  ): TitleValueObjectDto[] {
    return courses.flatMap((course) => {
      return [
        {
          title: "",
          value: course.name,
        },
        {
          title: "",
          value: course.student?.userName ?? "Unknown",
        },
        {
          title: "Sessions",
          value: course.sessions.length,
        },
      ];
    });
  }

  static mapTeacherProposals(proposals: any[]): ProposalDto[] {
    return proposals.map((proposal) => ({
      title: proposal.request.title,
      value: proposal.request.user.userName,
      chatId: proposal.chatId ?? "",
    }));
  }

  static mapStudentProposals(proposals: any[]): ProposalDto[] {
    return proposals.map((proposal) => ({
      title: proposal.request.title,
      value: proposal.user.userName,
      chatId: proposal.chatId ?? "",
    }));
  }

  static groupByMonth(counts: number[]): ChartDataDto[] {
    return counts.map((count, index) => ({
      month: months[index],
      value: count,
    }));
  }

  static groupByMonthByCreatedAt(items: CreateAtDateDto[]) {
    const counts = new Array(8).fill(0);

    items.forEach((item) => {
      const monthIndex = item.createdAt.getMonth();
      counts[monthIndex]++;
    });

    return this.groupByMonth(counts);
  }

  static groupByMonthDateOfTheSession(items: DateOfTheSessionDateDto[]) {
    const counts = new Array(8).fill(0);

    items.forEach((item) => {
      const monthIndex = item.dateOfTheSession.getMonth();
      counts[monthIndex]++;
    });

    return this.groupByMonth(counts);
  }
}
