import { CertificationService } from "@/contexts/CoreContext/application/services/CertificationService";
import { container } from "tsyringe";
import { GetCertificationsUseCase } from "./contexts/CoreContext/application/useCases/certifications/GetCertificationUseCase";
import { ICertificationController } from "./contexts/CoreContext/domain/interfaces/controllers/ICertificationController";
import { ICertificationRepository } from "./contexts/CoreContext/domain/interfaces/repositories/ICertificationRepository";
import { CertificationRepository } from "./contexts/CoreContext/infrastructure/persistence/CertificationRepository";
import { CertificationController } from "./contexts/CoreContext/presentation/http/controllers/CertificationController";
import { ICertificationService } from "./contexts/CoreContext/domain/interfaces/services/ICertificationService";
import { CourseRepository } from "./contexts/LearningContext/infrastructure/database/CourseRepository";
import { ICourseRepository } from "./contexts/LearningContext/domain/interfaces/ICourseRepository";
import { GetAllCoursesUseCase } from "./contexts/LearningContext/application/useCases/GetAllCoursesUseCase";
import { CreateCourseUseCase } from "./contexts/LearningContext/application/useCases/CreateCourseUseCase";
import { UpdateCourseUseCase } from "@/contexts/LearningContext/application/useCases/UpdateCourseUseCase";
import { DeleteCourseUseCase } from "@/contexts/LearningContext/application/useCases/DeleteCourseUseCase";
import { CourseService } from "./contexts/LearningContext/application/services/CourseService";
import { ICourseService } from "./contexts/LearningContext/domain/interfaces/ICourseService";
import { CourseController } from "./contexts/LearningContext/presentation/http/controllers/CourseController";
import IUseCase from "./contexts/LearningContext/domain/interfaces/IUseCase";
import { Course } from "@/contexts/LearningContext/domain/aggregates/Course";
import { ICourseController } from "@/contexts/LearningContext/domain/interfaces/ICourseController";
import { IFreelancerRepository } from "./contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository";
import { EditCourseUseCase } from "./contexts/LearningContext/application/useCases/EditCourseUseCase";
import { GetCourseUseCase } from "./contexts/LearningContext/application/useCases/GetCourseUseCase";
import { IUserRepository } from "./contexts/CoreContext/domain/interfaces/repositories/IUserRepository";
import { UserRepository } from "./contexts/CoreContext/infrastructure/persistence/UserRepository";
import { IUserController } from "./contexts/CoreContext/domain/interfaces/controllers/IUserController";
import { IUserService } from "./contexts/CoreContext/domain/interfaces/services/IUserService";
import { UserService } from "./contexts/CoreContext/application/services/UserService";
import { UserController } from "./contexts/CoreContext/presentation/http/controllers/UserController";
import { CreateUserFreelancerProfileUseCase } from "./contexts/CoreContext/application/useCases/CreateUserFreelancerProfileUseCase";
import { GetUserUseCase } from "./contexts/CoreContext/application/useCases/GetUserUseCase";
import { CreateUserUseCase } from "./contexts/CoreContext/application/useCases/CreateUserUseCase";
import FreelancerRepository from "./contexts/CoreContext/infrastructure/persistence/FreelancerRepository";
import { Skill } from "./contexts/CoreContext/domain/entities/Skill";
import AddSkillUseCase from "./contexts/CoreContext/application/useCases/AddSkillUseCase";
import GetSkillsUseCase from "./contexts/CoreContext/application/useCases/GetSkillsUseCase";
import FreelancerService from "./contexts/CoreContext/application/services/FreelancerService";
import { IFreelancerService } from "./contexts/CoreContext/domain/interfaces/services/IFreelancerService";
import IFreelancerController from "./contexts/CoreContext/domain/interfaces/controllers/IFreelancerController";
import FreelancerController from "./contexts/CoreContext/presentation/http/controllers/FreelancerController";
import DeleteSkillUseCase from "./contexts/CoreContext/application/useCases/DeleteSkillUseCase";
import EditSkillUseCase from "./contexts/CoreContext/application/useCases/EditSkillUseCase";
import { ISkillRepository } from "./contexts/CoreContext/domain/interfaces/repositories/ISkillRepository";
import SkillRepository from "./contexts/CoreContext/infrastructure/persistence/SkillRepository";
import { ISkillService } from "./contexts/CoreContext/domain/interfaces/services/ISkillService";
import SkillService from "./contexts/CoreContext/application/services/SkillService";
import { IEducationService } from "./contexts/CoreContext/domain/interfaces/services/IEducationService";
import EducationService from "./contexts/CoreContext/application/services/EducationService";
import { Education } from "./contexts/CoreContext/domain/entities/Education";
import AddEducationUseCase from "./contexts/CoreContext/application/useCases/AddEducationUseCase";
import GetEducationsUseCase from "./contexts/CoreContext/application/useCases/GetEducationsUseCase";
import EditEducationUseCase from "./contexts/CoreContext/application/useCases/EditEducationUseCase";
import DeleteEducationUseCase from "./contexts/CoreContext/application/useCases/DeleteEducationUseCase";
import { CreateCertificationUseCase } from "./contexts/CoreContext/application/useCases/certifications/CreateCertificationUseCase";
import { UpdateCertificationUseCase } from "./contexts/CoreContext/application/useCases/certifications/UpdateCertificationUseCase";
import { DeleteCertificationUseCase } from "./contexts/CoreContext/application/useCases/certifications/DeleteCertificationUseCase";
import { GetCertificationByIdUseCase } from "./contexts/CoreContext/application/useCases/certifications/GetCertificationByIdUseCase";
import { ExperienceRepository } from "./contexts/CoreContext/infrastructure/persistence/ExperienceRepository";
import { IExperienceRepository } from "./contexts/CoreContext/domain/interfaces/repositories/IExperienceRepository";
import { GetExperiencesUseCase } from "./contexts/CoreContext/application/useCases/experiences/GetExperienceUseCase";
import { CreateExperienceUseCase } from "./contexts/CoreContext/application/useCases/experiences/CreateExperienceUseCase";
import { UpdateExperienceUseCase } from "./contexts/CoreContext/application/useCases/experiences/UpdateExperienceUseCase";
import { DeleteExperienceUseCase } from "./contexts/CoreContext/application/useCases/experiences/DeleteExperienceUseCase";
import { GetExperienceByIdUseCase } from "./contexts/CoreContext/application/useCases/experiences/GetExperienceById";
import { IExperiences } from "./contexts/CoreContext/domain/interfaces/services/IExperienceService";
import { IExperienceController } from "./contexts/CoreContext/domain/interfaces/controllers/IExperienceController";
import { ExperienceService } from "./contexts/CoreContext/application/services/ExperienceService";
import { ExperienceController } from "./contexts/CoreContext/presentation/http/controllers/ExperienceController";
import { IEducationController } from "./contexts/CoreContext/domain/interfaces/controllers/IEducationController";
import EducationController from "./contexts/CoreContext/presentation/http/controllers/EducationController";
import IEducationRepository from "./contexts/CoreContext/domain/interfaces/repositories/IEducationRepository";
import EducationRepository from "./contexts/CoreContext/infrastructure/persistence/EducationRepository";
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
import { SyncUserUseCase } from "./contexts/CoreContext/application/useCases/SyncUserUseCase";
import { User } from "./contexts/CoreContext/domain/aggregates/User";
import { IAuthController } from "./contexts/CoreContext/domain/interfaces/controllers/IAuthController";
import { AuthController } from "./contexts/CoreContext/presentation/http/controllers/AuthController";
import { IAuthService } from "./contexts/CoreContext/domain/interfaces/services/IAuthService";
import { AuthService } from "./contexts/CoreContext/application/services/AuthService";
import { UpdateUserUseCase } from "./contexts/CoreContext/application/useCases/UpdateUserUseCase";

//User
container.registerSingleton<IUserRepository>("IUserRepository", UserRepository);

container.registerSingleton<GetUserUseCase>("GetUserUseCase", GetUserUseCase);

container.registerSingleton<CreateUserUseCase>(
  "CreateUserUseCase",
  CreateUserUseCase
);

container.registerSingleton<GetUserUseCase>("GetUserUseCase", GetUserUseCase);

container.registerSingleton<CreateUserFreelancerProfileUseCase>(
  "CreateUserFreelancerProfileUseCase",
  CreateUserFreelancerProfileUseCase
);

container.registerSingleton<UpdateUserUseCase>(
  "UpdateUserUseCase",
  UpdateUserUseCase
);

container.registerSingleton<IUserService>("IUserService", UserService);

container.registerSingleton<IUserController>("IUserController", UserController);

container.registerSingleton<IUseCase<User, User>>(
  "SyncUserUseCase",
  SyncUserUseCase
);

container.registerSingleton<ICourseRepository>(
  "ICourseRepository",
  CourseRepository
);

container.registerSingleton<IFreelancerRepository>(
  "IFreelancerRepository",
  FreelancerRepository
);
container.registerSingleton<ISkillRepository>(
  "ISkillRepository",
  SkillRepository
);
container.registerSingleton<IUseCase<void, Course[]>>(
  "GetAllCoursesUseCase",
  GetAllCoursesUseCase
);
container.registerSingleton<IUseCase<Course, Course>>(
  "EditCourseUseCase",
  EditCourseUseCase
);
container.registerSingleton<IUseCase<string, void>>(
  "DeleteCourseUseCase",
  DeleteCourseUseCase
);
container.registerSingleton<IUseCase<string, Course>>(
  "GetCourseUseCase",
  GetCourseUseCase
);

container.registerSingleton<CreateCourseUseCase>(
  "CreateCourseUseCase",
  CreateCourseUseCase
);

container.registerSingleton("UpdateCourseUseCase", UpdateCourseUseCase);
container.registerSingleton("DeleteCourseUseCase", DeleteCourseUseCase);

container.registerSingleton<ICourseService>("ICourseService", CourseService);

container.registerSingleton<ISkillService>("ISkillService", SkillService);

container.registerSingleton<ICourseController>(
  "ICourseController",
  CourseController
);

container.registerSingleton<IFreelancerRepository>(
  "IFreelancerRepository",
  FreelancerRepository
);

container.registerSingleton<IUseCase<Skill, Skill>>(
  "AddSkillUseCase",
  AddSkillUseCase
);

container.registerSingleton<IUseCase<Skill, void>>(
  "DeleteSkillUseCase",
  DeleteSkillUseCase
);

container.registerSingleton<IUseCase<Skill, Skill>>(
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
// Education dependencies
container.registerSingleton<IEducationController>(
  "IEducationController",
  EducationController
);
container.registerSingleton<IEducationService>(
  "IEducationService",
  EducationService
);

container.registerSingleton<IUseCase<Education, Education>>(
  "AddEducationUseCase",
  AddEducationUseCase
);

container.registerSingleton<IUseCase<string, Education[]>>(
  "GetEducationsUseCase",
  GetEducationsUseCase
);

container.registerSingleton<IUseCase<Education, Education>>(
  "EditEducationUseCase",
  EditEducationUseCase
);

container.registerSingleton<IUseCase<string, void>>(
  "DeleteEducationUseCase",
  DeleteEducationUseCase
);

container.registerSingleton<IEducationRepository>(
  "EducationRepository",
  EducationRepository
);

// experience
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

// Language

container.registerSingleton<ILanguageRepository>(
  "ILanguageRepository",
  LanguageRepository
);
container.registerSingleton<IUseCase<CreateLanguageDto, void | Language>>(
  "EditLanguageUseCase",
  EditLanguageUseCase
);
container.registerSingleton<IUseCase<CreateLanguageDto, Language>>(
  "CreateLanguageUseCase",
  CreateLanguageUseCase
);
container.registerSingleton<IUseCase<CreateLanguageDto, void | string>>(
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

//

container.registerSingleton<IAuthService>("IAuthService", AuthService);
container.registerSingleton<IAuthController>("IAuthController", AuthController);

export { container };
