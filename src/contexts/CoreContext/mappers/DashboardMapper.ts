import {
  P2PCourseDto,
  P2PStudentCourseDto,
  P2PTeacherCourseDto,
  ProposalWithRequestUser,
  TitleValueObjectDto,
} from "../domain/interfaces/dtos/DashboardDto";

export class DashboardMapper {
  static mapStudentP2PCourses(courses: P2PStudentCourseDto[]): P2PCourseDto {
    const formattedCourses = courses.map((course) => {
      return [
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
      ];
    });

    return { courses: formattedCourses };
  }

  static mapTeacherP2PCourses(courses: P2PTeacherCourseDto[]): P2PCourseDto {
    const formattedCourses = courses.map((course) => {
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

    return { courses: formattedCourses };
  }

  static mapProposals(
    proposals: ProposalWithRequestUser[]
  ): TitleValueObjectDto[] {
    return proposals.map((proposal) => ({
      title: proposal.request.title,
      value: proposal.request.user.userName ?? "Unknown",
    }));
  }
}
