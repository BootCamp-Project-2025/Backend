import { CertificationService } from "@/contexts/CoreContext/application/services/CertificationService";
import { container } from "tsyringe";
import { CourseRepository } from "./contexts/LearningContext/infrastructure/database/CourseRepository";
import { ICourseRepository } from "./contexts/LearningContext/domain/interfaces/ICourseRepository";
import { GetAllCoursesUseCase } from "./contexts/LearningContext/application/useCases/GetAllCoursesUseCase";
import { CreateCourseUseCase } from "./contexts/LearningContext/application/useCases/CreateCourseUseCase";
import { CourseService } from "./contexts/LearningContext/application/services/CourseService";
import { ICourseService } from "./contexts/LearningContext/domain/interfaces/ICourseService";
import { CourseController } from "./contexts/LearningContext/presentation/http/controllers/CourseController";
import IUseCase from "./contexts/LearningContext/domain/interfaces/IUseCase";
import { Course } from "@/contexts/LearningContext/domain/aggregates/Course";
import { ICourseController } from "@/contexts/LearningContext/domain/interfaces/ICourseController";
import { GetCertificationsUseCase } from "./contexts/CoreContext/application/useCases/certifications/GetCertificationUseCase";
import { ICertificationController } from "./contexts/CoreContext/domain/interfaces/controllers/ICertificationController";
import { ICertificationRepository } from "./contexts/CoreContext/domain/interfaces/repositories/ICertificationRepository";
import { CertificationRepository } from "./contexts/CoreContext/infrastructure/persistence/CertificationRepository";
import { CertificationController } from "./contexts/CoreContext/presentation/http/controllers/CertificationController";
import { ICertificationService } from "./contexts/CoreContext/domain/interfaces/services/ICertificationService";
import { CreateCertificationUseCase } from "./contexts/CoreContext/application/useCases/certifications/CreateCertificationUseCase";
import { UpdateCertificationUseCase } from "./contexts/CoreContext/application/useCases/certifications/UpdateCertificationUseCase";
import { DeleteCertificationUseCase } from "./contexts/CoreContext/application/useCases/certifications/DeleteCertificationUseCase";
import { GetCertificationByIdUseCase } from "./contexts/CoreContext/application/useCases/certifications/GetCertificationByIdUseCase";

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

container.registerSingleton<CreateCertificationUseCase>(
  "CreateCertificationUseCase",
  CreateCertificationUseCase
);

container.registerSingleton<UpdateCertificationUseCase>(
  "UpdateCertificationUseCase",
  UpdateCertificationUseCase
);

container.registerSingleton<DeleteCertificationUseCase>(
  "DeleteCertificationUseCase",
  DeleteCertificationUseCase
);

container.registerSingleton<GetCertificationByIdUseCase>(
  "GetCertificationById",
  GetCertificationByIdUseCase
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
