import { EnrollmentMapper } from "@/contexts/CoreContext/mappers/EnrollmentMapper";
import {
  Enrollment,
  EnrollmentStatus,
} from "@/contexts/CoreContext/domain/aggregates/Enrollment";
import { CourseId } from "@/contexts/LearningContext/domain/valueObjects/CourseId";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { UserId } from "@/contexts/CoreContext/domain/valueObjects/UserId";
import { Enrollment as PersistedEnrollment } from "@/generated/prisma";

describe("EnrollmentMapper", () => {
  describe("domainToDto", () => {
    it("should map Enrollment domain object to DTO", () => {
      const enrollment = Enrollment.create(
        {
          courseId: CourseId.create(new UniqueEntityID("course-123")),
          userId: UserId.create(new UniqueEntityID("user-456")),
          createdAt: new Date("2024-01-01T00:00:00Z"),
          status: EnrollmentStatus.ENROLLED,
        },
        "enroll-789"
      );

      const dto = EnrollmentMapper.domainToDto(enrollment);

      expect(dto).toEqual({
        id: "enroll-789",
        courseId: "course-123",
        userId: "user-456",
        createdAt: new Date("2024-01-01T00:00:00Z"),
        status: EnrollmentStatus.ENROLLED,
      });
    });
  });

  describe("createDtoToDomain", () => {
    it("should map create DTO to Enrollment domain object", () => {
      const dto = {
        courseId: "course-abc",
        userId: "user-def",
      };

      const enrollment = EnrollmentMapper.createDtoToDomain(dto);

      expect(enrollment.courseId.toString()).toBe("course-abc");
      expect(enrollment.userId.toString()).toBe("user-def");
      expect(enrollment.status).toBe(EnrollmentStatus.ENROLLED);
      expect(enrollment.createdAt).toBeInstanceOf(Date);
    });
  });

  describe("persistanceToDomain", () => {
    it("should map persisted enrollment to Enrollment domain object", () => {
      const persisted = {
        id: "enroll-xyz",
        courseId: "course-xyz",
        userId: "user-xyz",
        createdAt: new Date("2023-12-12T12:00:00Z"),
        status: "ENROLLED",
      };

      const enrollment = EnrollmentMapper.persistanceToDomain(
        persisted as unknown as PersistedEnrollment
      );

      expect(enrollment.id.toString()).toBe("enroll-xyz");
      expect(enrollment.courseId.toString()).toBe("course-xyz");
      expect(enrollment.userId.toString()).toBe("user-xyz");
      expect(enrollment.createdAt).toEqual(new Date("2023-12-12T12:00:00Z"));
      expect(enrollment.status).toBe(EnrollmentStatus.ENROLLED);
    });
  });
});
