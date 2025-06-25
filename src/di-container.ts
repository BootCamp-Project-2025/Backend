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
import { CourseDTO } from "./contexts/LearningContext/domain/dtos/CourseDTO";
import { EditCourseUseCase } from "./contexts/LearningContext/application/useCases/EditCourseUseCase";

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
container.registerSingleton<IUseCase<CourseDTO, Course>>(
  "EditCourseUseCase",
  EditCourseUseCase
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

export { container };
