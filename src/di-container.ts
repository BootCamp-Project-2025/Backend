import { container } from "tsyringe";

import { ICourseRepository } from "./contexts/LearningContext/domain/interfaces/ICourseRepository";
import { ICourseController } from "./contexts/LearningContext/domain/interfaces/ICourseController";
import { CourseRepository } from "./contexts/LearningContext/infrastructure/database/CourseRepository";
import { CourseController } from "./contexts/LearningContext/presentation/http/controllers/CourseController";
import IUseCase from "./contexts/LearningContext/domain/interfaces/IUseCase";
import { GetAllCoursesUseCase } from "./contexts/LearningContext/aplication/useCases/GetAllCoursesUseCase";
import { ICourseService } from "./contexts/LearningContext/domain/interfaces/ICourseService";
import { CourseService } from "./contexts/LearningContext/infrastructure/services/CourseService";
import { Course } from "./contexts/LearningContext/domain/aggregates/Course";

container.register<ICourseRepository>(
  "ICourseRepository",
  CourseRepository
);

container.register<IUseCase<void, Course[]>>(
  "GetAllCoursesUseCase",
  GetAllCoursesUseCase
);
container.register<ICourseService>("ICourseService", CourseService);

container.register<ICourseController>(
  "ICourseController",
  CourseController
);

export { container };
