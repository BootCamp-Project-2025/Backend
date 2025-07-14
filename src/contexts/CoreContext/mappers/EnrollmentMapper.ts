import { ICreateEnrollmentDto } from "../domain/interfaces/dtos/enrollment/ICreateEnrollmentDto";
import { Enrollment, EnrollmentStatus } from "../domain/aggregates/Enrollment";
import { CourseId } from "@/contexts/LearningContext/domain/valueObjects/CourseId";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { UserId } from "../domain/valueObjects/UserId";
import { Enrollment as PersistedEnrollment } from "@/generated/prisma";

export class EnrollmentMapper {
  static domainToDto(enrollment: Enrollment) {
    return {
      id: enrollment.id.toString(),
      courseId: enrollment.courseId.toString(),
      userId: enrollment.userId.toString(),
      createdAt: enrollment.createdAt,
      status: enrollment.status,
    };
  }

  static createDtoToDomain(dto: ICreateEnrollmentDto): Enrollment {
    const enrollment = Enrollment.create({
      courseId: CourseId.create(new UniqueEntityID(dto.courseId)),
      userId: UserId.create(new UniqueEntityID(dto.userId)),
      createdAt: new Date(),
      status: EnrollmentStatus.ENROLLED,
    });
    return enrollment;
  }

  static persistanceToDomain(dto: PersistedEnrollment): Enrollment {
    return Enrollment.create(
      {
        courseId: CourseId.create(new UniqueEntityID(dto.courseId)),
        userId: UserId.create(new UniqueEntityID(dto.userId)),
        createdAt: dto.createdAt,
        status: dto.status as EnrollmentStatus,
      },
      dto.id
    );
  }
}
