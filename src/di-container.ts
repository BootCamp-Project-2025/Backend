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
import { ILanguageRepository } from "./contexts/CoreContext/domain/interfaces/repositories/ILanguageRepositoty";
import LanguageRepository from "./contexts/CoreContext/infrastructure/persistence/LanguageRepository";
import { EditLanguageUseCase } from "./contexts/CoreContext/application/useCases/EditLanguageUseCase";
import { CreateLanguageDto } from "./contexts/CoreContext/domain/interfaces/dtos/CreateLanguageDto";
import { Language } from "./contexts/CoreContext/domain/entities/Language";
import { CreateLanguageUseCase } from "./contexts/CoreContext/application/useCases/CreateLanguageUseCase";
import { DeleteLanguageUseCase } from "./contexts/CoreContext/application/useCases/DeleteLanguageUseCase";
import { GetLanguagesUseCase } from "./contexts/CoreContext/application/useCases/GetLanguagesUseCase";
import { ILanguagesService } from "./contexts/CoreContext/domain/interfaces/services/ILanguages";
import LanguageService from "./contexts/CoreContext/application/services/LanguageService";
import ILanguageController from "./contexts/CoreContext/domain/interfaces/controllers/ILanguageController";
import LanguageController from "./contexts/CoreContext/presentation/http/controllers/LanguageController";

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

// Language

container.registerSingleton<ILanguageRepository>(
  "ILanguageRepository",
  LanguageRepository
);
container.registerSingleton<IUseCase<CreateLanguageDto, Language>>(
  "EditLanguageUseCase",
  EditLanguageUseCase
);
container.registerSingleton<IUseCase<CreateLanguageDto, Language>>(
  "CreateLanguageUseCase",
  CreateLanguageUseCase
);
container.registerSingleton<IUseCase<CreateLanguageDto, Language>>(
  "DeleteLanguageUseCase",
  DeleteLanguageUseCase
);
container.registerSingleton<IUseCase<string, Language[]>>(
  "GetLanguagesUseCase",
  GetLanguagesUseCase
);
container.registerSingleton<ILanguagesService>(
  "ILanguagesService",
  LanguageService
);

container.registerSingleton<ILanguageController>(
  "ILanguageController",
  LanguageController
);

export { container };
