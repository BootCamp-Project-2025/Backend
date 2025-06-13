import { CertificationService } from "@/contexts/CoreContext/application/services/CertificationService";
import { container } from "tsyringe";
import { GetCertificationsUseCase } from "./contexts/CoreContext/application/useCases/certifications/GetCertificationUseCase";
import { ICertificationController } from "./contexts/CoreContext/domain/interfaces/controllers/ICertificationController";
import { ICertificationRepository } from "./contexts/CoreContext/domain/interfaces/repositories/ICertificationRepository";
import { CertificationRepository } from "./contexts/CoreContext/infrastructure/persistence/CertificationRepository";
import { CertificationController } from "./contexts/CoreContext/presentation/http/controllers/CertificationController";
import { ICertificationService } from "./contexts/CoreContext/domain/interfaces/services/ICertificationService";

// container.registerSingleton<ICourseRepository>(
//   "ICourseRepository",
//   CourseRepository
// );
// container.registerSingleton<IUseCase<void, Course[]>>(
//   "GetAllCoursesUseCase",
//   GetAllCoursesUseCase
// );
// container.registerSingleton<CreateCourseUseCase>(
//   "CreateCourseUseCase",
//   CreateCourseUseCase
// );
// container.registerSingleton<ICourseService>("ICourseService", CourseService);

// container.registerSingleton<ICourseController>(
//   "ICourseController",
//   CourseController
// );

container.register<ICertificationRepository>(
  "ICertificationRepository",
  CertificationRepository
);

container.registerSingleton<GetCertificationsUseCase>(
  "GetCertificationUseCase",
  GetCertificationsUseCase
);

container.registerSingleton<ICertificationService>(
  "ICertificationService",
  CertificationService
);

container.registerSingleton<ICertificationController>(
  "ICertificationController",
  CertificationController
);

export { container };
