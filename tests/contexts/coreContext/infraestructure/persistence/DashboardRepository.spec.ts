import "reflect-metadata";
import { DashboardRepository } from "@/contexts/CoreContext/infrastructure/persistence/DashboardRepository";
import { DashboardMapper } from "@/contexts/CoreContext/mappers/DashboardMapper";
import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";

jest.mock("@/contexts/Shared/infrastructure/database/PrismaClient", () => ({
  enrollment: { findMany: jest.fn() },
  proposal: { findMany: jest.fn() },
  liveSession: { findMany: jest.fn() },
  request: { findMany: jest.fn() },
  p2PCourse: { findMany: jest.fn() },
  course: { findMany: jest.fn() },
}));

jest.mock("@/contexts/CoreContext/mappers/DashboardMapper", () => ({
  DashboardMapper: {
    mapStudentProposals: jest.fn(),
    mapTeacherProposals: jest.fn(),
    mapStudentP2PCourses: jest.fn(),
    mapTeacherP2PCourses: jest.fn(),
    groupByMonthByCreatedAt: jest.fn(),
    groupByMonthDateOfTheSession: jest.fn(),
  },
}));

describe("DashboardRepository", () => {
  let repository: DashboardRepository;

  beforeEach(() => {
    repository = new DashboardRepository();
    jest.clearAllMocks();
  });

  it("throws error if role is unsupported", async () => {
    await expect(repository.getStats("userId", "INVALID_ROLE")).rejects.toThrow(
      "Unsupported role for dashboard stats"
    );
  });

  it("calls student stats and returns expected data", async () => {
    (PrismaClient.enrollment.findMany as jest.Mock).mockResolvedValue([
      { status: "ENROLLED" },
      { status: "COMPLETED" },
    ]);
    (PrismaClient.proposal.findMany as jest.Mock).mockResolvedValue([
      { id: 1 },
    ]);
    (PrismaClient.liveSession.findMany as jest.Mock).mockResolvedValue([
      { dateOfTheSession: new Date() },
    ]);
    (PrismaClient.request.findMany as jest.Mock).mockResolvedValue([
      { id: 1, proposals: [], status: "OPEN" },
    ]);
    (PrismaClient.p2PCourse.findMany as jest.Mock).mockResolvedValue([
      { id: 1, sessions: [], teacher: { userName: "teacher1" } },
    ]);

    (DashboardMapper.mapStudentProposals as jest.Mock).mockReturnValue([
      { title: "Proposal", value: 1 },
    ]);
    (DashboardMapper.mapStudentP2PCourses as jest.Mock).mockReturnValue({
      courses: [],
    });
    (DashboardMapper.groupByMonthByCreatedAt as jest.Mock).mockReturnValue([
      { month: "January", value: 2 },
    ]);
    (DashboardMapper.groupByMonthDateOfTheSession as jest.Mock).mockReturnValue(
      [{ month: "January", value: 3 }]
    );

    const result = await repository.getStats("userId", "CLIENT");

    expect(PrismaClient.enrollment.findMany).toHaveBeenCalled();
    expect(DashboardMapper.mapStudentProposals).toHaveBeenCalled();
    expect(result).toHaveProperty("courses");
    expect(result).toHaveProperty("p2pCourses");
    expect(result).toHaveProperty("proposals");
    expect(result).toHaveProperty("coursesChart");
    expect(result).toHaveProperty("p2pCoursesChart");
  });

  it("calls teacher stats and returns expected data", async () => {
    (PrismaClient.course.findMany as jest.Mock).mockResolvedValue([
      { published: true },
    ]);
    (PrismaClient.proposal.findMany as jest.Mock).mockResolvedValue([
      { id: 1 },
    ]);
    (PrismaClient.enrollment.findMany as jest.Mock).mockResolvedValue([
      { userId: "student1" },
    ]);
    (PrismaClient.p2PCourse.findMany as jest.Mock).mockResolvedValue([
      { id: 1, sessions: [], student: { userName: "student1" } },
    ]);
    (PrismaClient.liveSession.findMany as jest.Mock).mockResolvedValue([
      { dateOfTheSession: new Date() },
    ]);
    (PrismaClient.enrollment.findMany as jest.Mock).mockResolvedValueOnce([
      { createdAt: new Date() },
    ]);

    (DashboardMapper.mapTeacherProposals as jest.Mock).mockReturnValue([
      { title: "Proposal", value: 1 },
    ]);
    (DashboardMapper.mapTeacherP2PCourses as jest.Mock).mockReturnValue({
      courses: [],
    });
    (DashboardMapper.groupByMonthByCreatedAt as jest.Mock).mockReturnValue([
      { month: "January", value: 2 },
    ]);
    (DashboardMapper.groupByMonthDateOfTheSession as jest.Mock).mockReturnValue(
      [{ month: "January", value: 3 }]
    );

    const result = await repository.getStats("userId", "FREELANCER");

    expect(PrismaClient.course.findMany).toHaveBeenCalled();
    expect(DashboardMapper.mapTeacherProposals).toHaveBeenCalled();
    expect(result).toHaveProperty("courses");
    expect(result).toHaveProperty("p2pCourses");
    expect(result).toHaveProperty("proposals");
    expect(result).toHaveProperty("coursesChart");
    expect(result).toHaveProperty("p2pCoursesChart");
  });
});
