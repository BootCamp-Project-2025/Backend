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
import FreelancerRepository from "./contexts/CoreContext/infrastructure/persistence/FreelancerRepository";
import { Skill } from "./contexts/CoreContext/domain/entities/Skill";
import { CreateSkillDto } from "./contexts/CoreContext/domain/interfaces/dtos/CreateSkillDto";
import AddSkillUseCase from "./contexts/CoreContext/application/useCases/AddSkillUseCase";
import GetSkillsUseCase from "./contexts/CoreContext/application/useCases/GetSkillsUseCase";
import FreelancerService from "./contexts/CoreContext/application/services/FreelancerService";
import { IFreelancerService } from "./contexts/CoreContext/domain/interfaces/services/IFreelancerService";
import IFreelancerController from "./contexts/CoreContext/domain/interfaces/controllers/IFreelancerController";
import FreelancerController from "./contexts/CoreContext/presentation/http/controllers/FreelancerController";
import DeleteSkillUseCase from "./contexts/CoreContext/application/useCases/DeleteSkillUseCase";
import EditSkillUseCase from "./contexts/CoreContext/application/useCases/EditSkillUseCase";

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

container.registerSingleton<IFreelancerRepository>(
  "IFreelancerRepository",
  FreelancerRepository
);

container.registerSingleton<IUseCase<CreateSkillDto, void>>(
  "AddSkillUseCase",
  AddSkillUseCase
);

container.registerSingleton<IUseCase<CreateSkillDto, void>>(
  "DeleteSkillUseCase",
  DeleteSkillUseCase
);

container.registerSingleton<IUseCase<CreateSkillDto, void>>(
  "EditSkillUseCase",
  EditSkillUseCase
);

container.registerSingleton<IUseCase<string, Skill[]>>(
  "GetSkillsUseCase",
  GetSkillsUseCase
);

container.registerSingleton<IFreelancerService>(
  "IFreelancerService",
  FreelancerService
);

container.registerSingleton<IFreelancerController>(
  "IFreelancerController",
  FreelancerController
);

export { container };
