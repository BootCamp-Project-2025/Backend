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
import { IUserRepository } from "./contexts/CoreContext/domain/interfaces/repositories/IUserRepository";
import { UserRepository } from "./contexts/CoreContext/infrastructure/persistence/UserRepository";
import { GetUserProfileUseCase } from "./contexts/CoreContext/application/useCases/GetUserProfileUseCase";
import { IUserController } from "./contexts/CoreContext/domain/interfaces/controllers/IUserController";
import { IUserService } from "./contexts/CoreContext/domain/interfaces/services/IUserService";
import { UserService } from "./contexts/CoreContext/application/services/UserService";
import { UserController } from "./contexts/CoreContext/presentation/http/controllers/UserController";
import { CreateUserFreelancerProfileUseCase } from "./contexts/CoreContext/application/useCases/CreateUserFreelancerProfileUseCase";
import { GetUserUseCase } from "./contexts/CoreContext/application/useCases/GetUserUseCase";
import { CreateUserUseCase } from "./contexts/CoreContext/application/useCases/CreateUserUseCase";

//User
container.registerSingleton<IUserRepository>("IUserRepository", UserRepository);

container.registerSingleton<GetUserUseCase>("GetUserUseCase", GetUserUseCase);

container.registerSingleton<GetUserProfileUseCase>(
  "GetUserProfileUseCase",
  GetUserProfileUseCase
);

container.registerSingleton<CreateUserUseCase>(
  "CreateUserUseCase",
  CreateUserUseCase
);

container.registerSingleton<GetUserUseCase>("GetUserUseCase", GetUserUseCase);

container.registerSingleton<CreateUserFreelancerProfileUseCase>(
  "CreateUserFreelancerProfileUseCase",
  CreateUserFreelancerProfileUseCase
);

container.registerSingleton<IUserService>("IUserService", UserService);

container.registerSingleton<IUserController>("IUserController", UserController);

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

export { container };
