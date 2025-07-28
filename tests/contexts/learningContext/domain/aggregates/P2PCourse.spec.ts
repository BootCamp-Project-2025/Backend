import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";
import { P2PCourseName } from "@/contexts/LearningContext/domain/valueObjects/P2PCourseName";
import P2PCourseStatus from "@/contexts/LearningContext/domain/valueObjects/P2PCourseStatus";
import P2PRemainingSessions from "@/contexts/LearningContext/domain/valueObjects/P2PRemainingSessions";
import UserId from "@/contexts/LearningContext/domain/valueObjects/UserId";

describe("P2PCourse aggregate", () => {
  it("Exists", () => {
    expect(P2PCourse).toBeDefined();
  });
  it("Creates from primitives correctly", () => {
    expect(
      P2PCourse.createFromPrimitive({
        studentId: "testId",
        teacherId: "testId",
        name: "testId",
        remainingSession: 0,
        status: "ACTIVE",
        posts: [],
        files: [],
        sessions: [],
      })
    ).toBeInstanceOf(P2PCourse);
  });
  it("Creates from value objects correctly", () => {
    expect(
      P2PCourse.create({
        studentId: UserId.create({ userId: "studentId" }),
        teacherId: UserId.create({ userId: "testId" }),
        name: P2PCourseName.create({ name: "courseName" }),
        remainingSessions: P2PRemainingSessions.create({
          remainingSessions: 0,
        }),
        status: P2PCourseStatus.create({ status: "ACTIVE" }),
        posts: [],
        files: [],
        sessions: [],
      })
    );
  });
});
