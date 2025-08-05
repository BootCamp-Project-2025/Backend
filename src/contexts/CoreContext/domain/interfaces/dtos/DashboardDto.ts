import { UserName } from "../../valueObjects/UserName";

export type Role = "CLIENT" | "FREELANCER";

export interface TitleValueObjectDto {
  title: string;
  value: number | string | UserName;
}

export interface StudentDashboardStatsDto {
  role: Role;
  courses: TitleValueObjectDto[];
  p2pCourses: P2PCourseDto;
  requests: TitleValueObjectDto[];
  proposals: TitleValueObjectDto[];
}

export interface P2PCourseDto {
  courses: TitleValueObjectDto[][];
}

export interface TeacherDashboardStatsDto {
  role: Role;
  courses: TitleValueObjectDto[];
  p2pCourses: P2PCourseDto;
  proposals: TitleValueObjectDto[];
}

export type FilePostDTO = {
  id?: string;
  url: string;
  creationDate: Date;
};

export type PostDTO = {
  id: string;
  title: string;
  description?: string;
  url?: string;
  creationDate: Date;
};

export type SessionDTO = {
  id?: string;
  url: string;
  dateOfTheSession: Date;
  creationDate: Date;
  status: "COMPLETED" | "PENDING" | "CANCELED";
};

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

export interface ProposalWithRequestUser {
  request: {
    title: string;
    user: {
      userName: string;
    };
  };
}
