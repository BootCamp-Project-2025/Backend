import { ICreateEnrollmentDto } from "../domain/interfaces/dtos/enrollment/ICreateEnrollmentDto";
import { Enrollment, EnrollmentStatus } from "../domain/aggregates/Enrollment";
import { CourseId } from "@/contexts/LearningContext/domain/valueObjects/CourseId";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { UserId } from "../domain/valueObjects/UserId";

export class EnrollmentMapper {
  static domainToDto(enrollment: Enrollment) {
    return {
      id: enrollment.id,
      courseId: enrollment.courseId,
      userId: enrollment.userId,
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
}
