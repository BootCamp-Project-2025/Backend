import {
  Enrollment,
  EnrollmentStatus,
} from "@/contexts/CoreContext/domain/aggregates/Enrollment";
import { CourseId } from "@/contexts/LearningContext/domain/valueObjects/CourseId";
import { UserId } from "@/contexts/CoreContext/domain/valueObjects/UserId";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

describe("Enrollment Aggregate", () => {
  const userId = UserId.create(new UniqueEntityID("user-123"));
  const courseId = CourseId.create(new UniqueEntityID("course-456"));
  const createdAt = new Date();

  it("should create a valid enrollment", () => {
    const enrollment = Enrollment.create({
      userId,
      courseId,
      createdAt,
      status: EnrollmentStatus.ENROLLED,
    });

    expect(enrollment).toBeInstanceOf(Enrollment);
    expect(enrollment.userId).toEqual(userId);
    expect(enrollment.courseId).toEqual(courseId);
    expect(enrollment.createdAt).toEqual(createdAt);
    expect(enrollment.status).toBe(EnrollmentStatus.ENROLLED);
  });

  it("should throw error if userId or courseId are missing", () => {
    expect(() =>
      Enrollment.create({
        userId: null as unknown as UserId,
        courseId,
        createdAt,
        status: EnrollmentStatus.ENROLLED,
      })
    ).toThrow("Course ID and User ID are required.");

    expect(() =>
      Enrollment.create({
        userId,
        courseId: null as unknown as CourseId,
        createdAt,
        status: EnrollmentStatus.ENROLLED,
      })
    ).toThrow("Course ID and User ID are required.");
  });

  it("should change status to CANCELED on cancel()", () => {
    const enrollment = Enrollment.create({
      userId,
      courseId,
      createdAt,
      status: EnrollmentStatus.ENROLLED,
    });

    enrollment.cancel();
    expect(enrollment.status).toBe(EnrollmentStatus.CANCELED);
  });

  it("should change status to COMPLETED on complete()", () => {
    const enrollment = Enrollment.create({
      userId,
      courseId,
      createdAt,
      status: EnrollmentStatus.ENROLLED,
    });

    enrollment.complete();
    expect(enrollment.status).toBe(EnrollmentStatus.COMPLETED);
  });

  it("getters should return correct values", () => {
    const enrollment = Enrollment.create({
      userId,
      courseId,
      createdAt,
      status: EnrollmentStatus.ENROLLED,
    });

    expect(enrollment.userId).toBe(userId);
    expect(enrollment.courseId).toBe(courseId);
    expect(enrollment.createdAt).toBe(createdAt);
    expect(enrollment.status).toBe(EnrollmentStatus.ENROLLED);
  });
});
