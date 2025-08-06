import { UserName } from "../../valueObjects/UserName";

export interface TitleValueObjectDto {
  title: string;
  value: number | string | UserName;
}

export interface StudentDashboardStatsDto {
  courses: TitleValueObjectDto[];
  p2pCourses: TitleValueObjectDto[];
  requests: TitleValueObjectDto[];
  proposals: TitleValueObjectDto[];
  coursesChart: ChartDataDto[];
  p2pCoursesChart: ChartDataDto[];
}

export interface TeacherDashboardStatsDto {
  courses: TitleValueObjectDto[];
  p2pCourses: TitleValueObjectDto[];
  proposals: TitleValueObjectDto[];
  coursesChart: ChartDataDto[];
  p2pCoursesChart: ChartDataDto[];
}

export type P2PStudentCourseDto = {
  name: string;
  teacher: {
    userName?: string;
  };
  sessions: { id: string }[];
};

export type P2PTeacherCourseDto = {
  name: string;
  student: {
    userName?: string;
  };
  sessions: { id: string }[];
};

export interface ProposalDto {
  title: string;
  value: string | UserName;
  chatId: string;
}

export interface ChartDataDto {
  month: string;
  value: number;
}

export interface CreateAtDateDto {
  createdAt: Date;
}

export interface DateOfTheSessionDateDto {
  dateOfTheSession: Date;
}
