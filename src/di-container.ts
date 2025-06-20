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
import { IFreelancerRepository } from "./contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository";
import { FreelancerRepository } from "./contexts/CoreContext/infrastructure/persistence/FreelancerRepository";
import { IExperienceRepository } from "./contexts/CoreContext/domain/interfaces/repositories/IExperienceRepository";
import { ExperienceRepository } from "./contexts/CoreContext/infrastructure/persistence/ExperienceRepository";
import { GetExperiencesUseCase } from "./contexts/CoreContext/application/useCases/experiences/GetExperienceUseCase";
import { CreateExperienceUseCase } from "./contexts/CoreContext/application/useCases/experiences/CreateExperienceUseCase";
import { UpdateExperienceUseCase } from "./contexts/CoreContext/application/useCases/experiences/UpdateExperienceUseCase";
import { DeleteExperienceUseCase } from "./contexts/CoreContext/application/useCases/experiences/DeleteExperienceUseCase";
import { GetExperienceByIdUseCase } from "./contexts/CoreContext/application/useCases/experiences/GetExperienceById";
import { IExperiences } from "./contexts/CoreContext/domain/interfaces/services/IExperienceService";
import { IExperienceController } from "./contexts/CoreContext/domain/interfaces/controllers/IExperienceController";
import { ExperienceService } from "./contexts/CoreContext/application/services/ExperienceService";
import { ExperienceController } from "./contexts/CoreContext/presentation/http/controllers/ExperienceController";

container.registerSingleton<ICourseRepository>(
  "ICourseRepository",
  CourseRepository
);
container.registerSingleton<IFreelancerRepository>(
  "IFreelancerRepository",
  FreelancerRepository
);
container.registerSingleton<IUseCase<void, Course[]>>(
  "GetAllCoursesUseCase",
  GetAllCoursesUseCase
);
container.registerSingleton<CreateCourseUseCase>(
  "CreateCourseUseCase",
  CreateCourseUseCase
);
container.registerSingleton<ICourseService>("ICourseService", CourseService);

container.registerSingleton<ICourseController>(
  "ICourseController",
  CourseController
);

container.register<IExperienceRepository>(
  "IExperienceRepository",
  ExperienceRepository
);

container.registerSingleton<GetExperiencesUseCase>(
  "GetExperiencesUseCase",
  GetExperiencesUseCase
);

container.registerSingleton<CreateExperienceUseCase>(
  "CreateExperienceUseCase",
  CreateExperienceUseCase
);

container.registerSingleton<UpdateExperienceUseCase>(
  "UpdateExperienceUseCase",
  UpdateExperienceUseCase
);

container.registerSingleton<DeleteExperienceUseCase>(
  "DeleteExperienceUseCase",
  DeleteExperienceUseCase
);

container.registerSingleton<GetExperienceByIdUseCase>(
  "GetExperienceByIdUseCase",
  GetExperienceByIdUseCase
);

container.registerSingleton<IExperiences>(
  "IExperienceService",
  ExperienceService
);

container.registerSingleton<IExperienceController>(
  "IExperienceController",
  ExperienceController
);

export { container };
