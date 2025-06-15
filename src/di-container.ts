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
import { IEducationController } from "./contexts/CoreContext/domain/interfaces/controllers/IEducationController";
import { EducationController } from "./contexts/CoreContext/presentation/http/controllers/EducationController";
import { IEducationService } from "./contexts/CoreContext/domain/interfaces/services/IEducationService";
import { EducationService } from "./contexts/CoreContext/domain/services/EducationService";
import {
  GetFreelancerEducationUseCase,
  IGetFreelancerEducationUseCase,
} from "./contexts/CoreContext/application/useCases/education/GetFreelancerEducationUseCase";
import {
  GetAllFreelancerEducationUseCase,
  IGetAllFreelancerEducationUseCase,
} from "./contexts/CoreContext/application/useCases/education/GetAllFreelancerEducationUseCase";
import {
  CreateFreelancerEducationUseCase,
  ICreateFreelancerEducationUseCase,
} from "./contexts/CoreContext/application/useCases/education/CreateFreelancerEducationUseCase";
import {
  IUpdateFreelancerEducationUseCase,
  UpdateFreelancerEducationUseCase,
} from "./contexts/CoreContext/application/useCases/education/UpdateFreelancerEducationUseCase";
import {
  DeleteFreelancerEducationUseCase,
  IDeleteFreelancerEducationUseCase,
} from "./contexts/CoreContext/application/useCases/education/DeleteFreelancerEducationUseCase";

container.registerSingleton<ICourseRepository>(
  "ICourseRepository",
  CourseRepository
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

// Freelance Education registrations
container.register<IEducationController>(
  "EducationController",
  EducationController
);

container.register<IEducationService>("EducationService", EducationService);

container.register<IGetFreelancerEducationUseCase>(
  "GetFreelancerEducationUseCase",
  GetFreelancerEducationUseCase
);

container.register<IGetAllFreelancerEducationUseCase>(
  "GetAllFreelancerEducationUseCase",
  GetAllFreelancerEducationUseCase
);

container.register<ICreateFreelancerEducationUseCase>(
  "CreateFreelancerEducationUseCase",
  CreateFreelancerEducationUseCase
);

container.register<IUpdateFreelancerEducationUseCase>(
  "CreateFreelancerEducationUseCase",
  UpdateFreelancerEducationUseCase
);

container.register<IDeleteFreelancerEducationUseCase>(
  "UpdateFreelancerEducationUseCase",
  DeleteFreelancerEducationUseCase
);

export { container };
