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
import { IAboutRepository } from "./contexts/CoreContext/domain/interfaces/repositories/IAboutRepository";
import GetAboutUseCase from "./contexts/CoreContext/application/useCases/GetAboutUseCase";
import UpdateAboutUseCase from "./contexts/CoreContext/application/useCases/UpdateAboutUseCase";
import { AboutRepository } from "./contexts/CoreContext/infrastructure/persistence/AboutRepository";

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

//About related registrations
container.registerSingleton<IAboutRepository>(
  "IAboutRepository",
  AboutRepository
);
container.registerSingleton<GetAboutUseCase>(
  "GetAboutUseCase",
  GetAboutUseCase
);

container.registerSingleton<UpdateAboutUseCase>(
  "UpdateAboutUseCase",
  UpdateAboutUseCase
);

export { container };
