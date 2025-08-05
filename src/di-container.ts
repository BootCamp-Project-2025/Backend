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
import IModuleController from "./contexts/LearningContext/domain/interfaces/IModuleController";
import ModuleController from "./contexts/LearningContext/presentation/http/controllers/ModuleController";
import IModuleService from "./contexts/LearningContext/domain/interfaces/IModuleService";
import ModuleService from "./contexts/LearningContext/application/services/ModuleService";
import GetAllModulesUseCase from "./contexts/LearningContext/application/useCases/module/GetAllModulesUseCase";
import DeleteModuleUseCase from "./contexts/LearningContext/application/useCases/module/DeleteModuleUseCase";
import CreateModuleUseCase from "./contexts/LearningContext/application/useCases/module/CreateModuleUseCase";
import UpdateModuleUseCase from "./contexts/LearningContext/application/useCases/module/UpdateModuleUseCase";
import { Module } from "./contexts/LearningContext/domain/entities/Module";
import { ModuleRepository } from "./contexts/LearningContext/infrastructure/database/ModuleRepository";
import IModuleRepository from "./contexts/LearningContext/domain/interfaces/IModuleRepository";
import ILessonController from "./contexts/LearningContext/domain/interfaces/ILessonController";
import LessonController from "./contexts/LearningContext/presentation/http/controllers/LessonController";
import ILessonService from "./contexts/LearningContext/domain/interfaces/ILessonService";
import LessonService from "./contexts/LearningContext/application/services/LessonService";
import ILessonRepository from "./contexts/LearningContext/domain/interfaces/ILessonRepository";
import LessonRepository from "./contexts/LearningContext/infrastructure/database/LessonRepository";
import { Lesson } from "./contexts/LearningContext/domain/entities/Lesson";
import CreateLessonUseCase from "./contexts/LearningContext/application/useCases/lesson/CreateLessonUseCase";
import DeleteLessonUseCase from "./contexts/LearningContext/application/useCases/lesson/DeleteLessonUseCase";
import UpdateLessonUseCase from "./contexts/LearningContext/application/useCases/lesson/UpdateLessonUseCase";
import {
  PublishCourseUseCase,
  PublishInput,
} from "./contexts/LearningContext/application/useCases/PublishCourseUseCase";
import { Freelancer } from "./contexts/CoreContext/domain/aggregates/Freelancer";
import { GetAllFreelancersUseCase } from "./contexts/CoreContext/application/useCases/GetAllFreelancersUseCase";
import { User } from "./contexts/CoreContext/domain/aggregates/User";
import { IAuthController } from "./contexts/CoreContext/domain/interfaces/controllers/IAuthController";
import { AuthController } from "./contexts/CoreContext/presentation/http/controllers/AuthController";
import { AuthService } from "./contexts/CoreContext/application/services/AuthService";
import { UpdateUserUseCase } from "./contexts/CoreContext/application/useCases/UpdateUserUseCase";
import { CourseDTO } from "./contexts/LearningContext/domain/dtos/CourseDTO";
import { DeleteSkillDto } from "./contexts/CoreContext/domain/interfaces/dtos/DeleteSkillDto";
import { CreateEducationDto } from "./contexts/CoreContext/domain/interfaces/dtos/CreateEducationDto";
import { DeleteEducationDto } from "./contexts/CoreContext/domain/interfaces/dtos/DeleteEducationDto";
import { DeleteLanguageDto } from "./contexts/CoreContext/domain/interfaces/dtos/DeleteLanguageDto";
import { UpdateRoleUseCase } from "./contexts/CoreContext/application/useCases/auth/UpdateRoleUseCase";
import { IExternarlAuthService } from "./contexts/CoreContext/domain/interfaces/services/IExternalAuthService";
import { KeycloakService } from "./contexts/CoreContext/infrastructure/keycloak/keycloakService";
import { SyncUserUseCase } from "./contexts/CoreContext/application/useCases/auth/SyncUserUseCase";
import { IAuthService } from "./contexts/CoreContext/domain/interfaces/services/IAuthService";
import IRequestController from "./contexts/CoreContext/domain/interfaces/controllers/IRequestController";
import { RequestController } from "./contexts/CoreContext/presentation/http/controllers/RequestController";
import IRequestService from "./contexts/CoreContext/domain/interfaces/services/IRequestService";
import IRequestRepository from "./contexts/CoreContext/domain/interfaces/repositories/IRequestRepository";
import RequestService from "./contexts/CoreContext/application/services/RequestService";
import RequestRepository from "./contexts/CoreContext/infrastructure/persistence/RequestRepository";
import GetUserActiveRequestUseCase from "./contexts/CoreContext/application/useCases/requests/GetUserActiveRequestUseCase";
import { Request } from "./contexts/CoreContext/domain/aggregates/Request";
import DeleteRequestUseCase from "./contexts/CoreContext/application/useCases/requests/DeleteRequestUseCase";
import CreateRequestUseCase from "./contexts/CoreContext/application/useCases/requests/CreateRequestUseCase";
import { IChatController } from "./contexts/CoreContext/domain/interfaces/controllers/IChatController";
import { ChatController } from "./contexts/CoreContext/presentation/http/controllers/ChatController";
import { IChatService } from "./contexts/CoreContext/domain/interfaces/services/IChatService";
import { ChatService } from "./contexts/CoreContext/application/services/ChatService";
import { IMessageService } from "./contexts/CoreContext/domain/interfaces/services/IMessageService";
import { MessageService } from "./contexts/CoreContext/application/services/MessageService";
import { CreateChatUsecase } from "./contexts/CoreContext/application/useCases/chats/CreateChatUseCase";
import { CreateMessageUseCase } from "./contexts/CoreContext/application/useCases/chats/CreateMessageUseCase";
import { GetChatsByUserIdUseCase } from "./contexts/CoreContext/application/useCases/chats/GetChatsByUserIdUseCase";
import { GetMessagesByChatIdUseCase } from "./contexts/CoreContext/application/useCases/chats/GetMessagesByChatIdUseCase";
import { UpdateMessageStatusUseCase } from "./contexts/CoreContext/application/useCases/chats/UpdateMessageStatusUseCase";
import { Chat } from "./contexts/CoreContext/domain/aggregates/Chat";
import { Message } from "./contexts/CoreContext/domain/entities/Message";
import { IChatRepository } from "./contexts/CoreContext/domain/interfaces/repositories/IChatRepository";
import { ChatRepository } from "./contexts/CoreContext/infrastructure/persistence/ChatRepository";
import { IMessageRepository } from "./contexts/CoreContext/domain/interfaces/repositories/IMessageRepository";
import { MessageRepository } from "./contexts/CoreContext/infrastructure/persistence/MessageRepository";
import { GetChatByIdUseCase } from "./contexts/CoreContext/application/useCases/chats/GetChatByIdUseCase";
import { IClientService } from "./contexts/CoreContext/domain/interfaces/services/IClientService";
import ClientService from "./contexts/CoreContext/application/services/ClientService";
import { IClientController } from "./contexts/CoreContext/domain/interfaces/controllers/IClientController";
import { ClientController } from "./contexts/CoreContext/presentation/http/controllers/ClientController";
import { GetClientUseCase } from "./contexts/CoreContext/application/useCases/client/GetClientUseCase";
import { UpdateClientUseCase } from "./contexts/CoreContext/application/useCases/client/UpdateClientUseCase";
import { ClientRepository } from "./contexts/CoreContext/infrastructure/persistence/ClientRepository";
import { IClientRepository } from "./contexts/CoreContext/domain/interfaces/repositories/IClientRepository";
import { IEnrollmentService } from "./contexts/CoreContext/domain/interfaces/services/IEnrollmentService";
import { EnrollmentService } from "./contexts/CoreContext/application/services/EnrollmentService";
import { EnrollmentController } from "./contexts/CoreContext/presentation/http/controllers/EnrollmentController";
import { CreateEnrollmentUseCase } from "./contexts/CoreContext/application/useCases/enrollment/CreateEnrollmentUseCase";
import { Enrollment } from "./contexts/CoreContext/domain/aggregates/Enrollment";
import { IEnrollmentController } from "./contexts/CoreContext/domain/interfaces/controllers/IEnrollmentController";
import { CancelEnrollmentUseCase } from "./contexts/CoreContext/application/useCases/enrollment/CancelEnrollmenetUseCase";
import { IEnrollmentRepository } from "./contexts/CoreContext/domain/interfaces/repositories/IEnrollmentRepository";
import { EnrollmentRepository } from "./contexts/CoreContext/infrastructure/persistence/EnrollmentRepository";
import { IProposalReposisory } from "./contexts/CoreContext/domain/interfaces/repositories/IProposalRepository";
import { ProposalRepository } from "./contexts/CoreContext/infrastructure/persistence/ProposalRepository";
import { GetProposalByChatIdUseCase } from "./contexts/CoreContext/application/useCases/proposal/GetProposalByChatIdUseCase";
import { Proposal } from "./contexts/CoreContext/domain/entities/Proposal";
import { UpdateProposalUseCase } from "./contexts/CoreContext/application/useCases/proposal/UpdateProposalUseCase";
import { CreateProposalUseCase } from "./contexts/CoreContext/application/useCases/proposal/CreateProposalUseCase";
import { IProposalService } from "./contexts/CoreContext/domain/interfaces/services/IProposalService";
import { ProposalService } from "./contexts/CoreContext/application/services/ProposalService";
import { ProposalController } from "./contexts/CoreContext/presentation/http/controllers/ProposalController";
import { IProposalController } from "./contexts/CoreContext/domain/interfaces/controllers/IProposalController";
import { UpdateChatUseCase } from "./contexts/CoreContext/application/useCases/chats/UpdateChatUseCase";
import IP2PCourseController from "./contexts/LearningContext/domain/interfaces/IP2PCourseController";
import { P2PCourseController } from "./contexts/LearningContext/presentation/http/controllers/P2PCourseController";
import IP2PCourseService from "./contexts/LearningContext/domain/interfaces/IP2PCourseService";
import { P2PCourseService } from "./contexts/LearningContext/application/services/P2PCourseService";
import CreateP2PCourseUseCase from "./contexts/LearningContext/application/useCases/p2pCourse/CreateP2PCourseUseCase";
import { P2PCourse } from "./contexts/LearningContext/domain/aggregates/P2PCourse";
import LiveSession from "./contexts/LearningContext/domain/entities/LiveSession";
import AddSessionUseCase from "./contexts/LearningContext/application/useCases/p2pCourse/AddSessionUseCase";
import RemoveSessionUseCase from "./contexts/LearningContext/application/useCases/p2pCourse/RemoveSessionUseCase";
import EditSessionUseCase from "./contexts/LearningContext/application/useCases/p2pCourse/EditSessionUseCase";
import CompleteSessionUseCase from "./contexts/LearningContext/application/useCases/p2pCourse/CompleteSessionUseCase";
import AddPostUseCase from "./contexts/LearningContext/application/useCases/p2pCourse/AddPostUseCase";
import { Post } from "./contexts/LearningContext/domain/entities/Posts";
import RemovePostUseCase from "./contexts/LearningContext/application/useCases/p2pCourse/RemovePostUseCase";
import EditPostUseCase from "./contexts/LearningContext/application/useCases/p2pCourse/EditPostUseCase";
import AddFilePostUseCase from "./contexts/LearningContext/application/useCases/p2pCourse/AddFilePostUseCase";
import { FilePost } from "./contexts/LearningContext/domain/entities/FilePost";
import RemoveFilePostUseCase from "./contexts/LearningContext/application/useCases/p2pCourse/RemoveFilePostUseCase";
import GetByUserIdAndCourseIdUseCase from "./contexts/LearningContext/application/useCases/p2pCourse/GetByUserIdAndCourseIdUseCase";
import { GetUserCoursesUseCase } from "./contexts/CoreContext/application/useCases/GetUserCoursesUseCase";
import { ICdnService } from "./contexts/CoreContext/domain/interfaces/services/ICdnService";
import { CloudinaryService } from "./contexts/CoreContext/infrastructure/cdn/CloudinaryService";
import { CheckEnrollmentUseCase } from "./contexts/CoreContext/application/useCases/enrollment/CheckEnrollmentUseCase";
import { GetUserEnrollmentsUseCase } from "./contexts/CoreContext/application/useCases/enrollment/GetUserEnrollmentsUseCase";
import { StudentTrackProgressRepository } from "./contexts/LearningContext/infrastructure/database/StudentTrackProgresRepository";
import CreateStudentTrackProgressUseCase from "./contexts/LearningContext/application/useCases/studentTrackProgress/CreateStudentTrackProgressUseCase";
import GetStudentTrackProgressByEnrollmentUseCase from "./contexts/LearningContext/application/useCases/studentTrackProgress/GetStudentTrackProgressByEnrollmentUseCase";
import GetStudentTrackProgressByIdUseCase from "./contexts/LearningContext/application/useCases/studentTrackProgress/GetStudentTrackProgressByIdUseCase";
import UpdateStudentTrackProgressUseCase from "./contexts/LearningContext/application/useCases/studentTrackProgress/UpdateStudentTrackProgressUseCase";
import { IStudentTrackProgressRepository } from "./contexts/LearningContext/domain/interfaces/IStudentTrackProgressRepository";
import { IStudentTrackProgressService } from "./contexts/LearningContext/domain/interfaces/IStudentTrackProgressService";
import StudentTrackProgressService from "./contexts/LearningContext/application/services/StudentTrackProgressService";
import GetLessonByIdUseCase from "./contexts/LearningContext/application/useCases/lesson/GetLessonByIdUseCase";
import StudentTrackProgressController from "./contexts/LearningContext/presentation/http/controllers/StudentTrackProgressController ";
import { GetEnrollmentByIdUseCase } from "./contexts/CoreContext/application/useCases/enrollment/GetEnrollmentByIdUseCase";
import IPostRepository from "./contexts/LearningContext/domain/interfaces/IPostRepository";
import ILiveSessionRepository from "./contexts/LearningContext/domain/interfaces/ILiveSessionRepository";
import IFilePostRepository from "./contexts/LearningContext/domain/interfaces/IFilePostRepository";
import IP2PCourseRepository from "./contexts/LearningContext/domain/interfaces/IP2PCourseRepository";
import PostRepository from "./contexts/LearningContext/infrastructure/database/PostRepository";
import LiveSessionRepository from "./contexts/LearningContext/infrastructure/database/LiveSessionRepository";
import FilePostRepository from "./contexts/LearningContext/infrastructure/database/FilePostRepository";
import P2PCourseRepository from "./contexts/LearningContext/infrastructure/database/P2PCourseRepository";
import GetP2PCourseByIdUseCase from "./contexts/LearningContext/application/useCases/p2pCourse/GetP2PCourseByIdUseCase";
import { ISearchService } from "./contexts/CoreContext/domain/interfaces/services/ISearchService";
import { ElasticSearchService } from "./contexts/CoreContext/application/services/ElasticSearchService";
import { QueryParamsDto } from "./contexts/CoreContext/domain/interfaces/dtos/search/QueryParamsDto";
import { SearchRequestUseCase } from "./contexts/CoreContext/application/useCases/requests/SearchRequestUseCase";
import { PageDto } from "./contexts/CoreContext/domain/interfaces/dtos/search/PageDto";
import { SearchCourseUseCase } from "./contexts/LearningContext/application/useCases/searchCourseUseCase";
import { IDashboardRepository } from "./contexts/CoreContext/domain/interfaces/repositories/IDashboardRepository";
import { DashboardRepository } from "./contexts/CoreContext/infrastructure/persistence/DashboardRepository";
import { GetDashboardUseCase } from "./contexts/CoreContext/application/useCases/GetDashboardUseCase";
import { IDashboardService } from "./contexts/CoreContext/domain/interfaces/services/IDashboardService";
import { DashboardService } from "./contexts/CoreContext/application/services/DashboardService";
import { IDashboardController } from "./contexts/CoreContext/domain/interfaces/controllers/IDashboardController";
import { DashboardController } from "./contexts/CoreContext/presentation/http/controllers/DashboardController";

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

container.registerSingleton<GetUserCoursesUseCase>(
  "GetUserCoursesUseCase",
  GetUserCoursesUseCase
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
container.registerSingleton<IUseCase<CourseDTO, Course>>(
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

container.registerSingleton<IUseCase<PublishInput, boolean>>(
  "PublishCourseUseCase",
  PublishCourseUseCase
);
container.registerSingleton("UpdateCourseUseCase", UpdateCourseUseCase);
container.registerSingleton("DeleteCourseUseCase", DeleteCourseUseCase);

container.registerSingleton<ICourseService>("ICourseService", CourseService);

container.registerSingleton<ISkillService>("ISkillService", SkillService);

container.registerSingleton<ICourseController>(
  "ICourseController",
  CourseController
);

container.registerSingleton<IUseCase<null, Freelancer[]>>(
  "IGetAllFreelancerUseCase",
  GetAllFreelancersUseCase
);

container.registerSingleton<IFreelancerRepository>(
  "IFreelancerRepository",
  FreelancerRepository
);

container.registerSingleton<IUseCase<Skill, Skill>>(
  "AddSkillUseCase",
  AddSkillUseCase
);

container.registerSingleton<IUseCase<DeleteSkillDto, void>>(
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

container.registerSingleton<ILessonController>(
  "ILessonController",
  LessonController
);

container.registerSingleton<ILessonService>("ILessonService", LessonService);

container.registerSingleton<ILessonRepository>(
  "ILessonRepository",
  LessonRepository
);

container.registerSingleton<
  IUseCase<
    {
      lesson: Lesson;
      moduleId: string;
    },
    Lesson
  >
>("CreateLessonUseCase", CreateLessonUseCase);

container.registerSingleton<IUseCase<Lesson, Lesson>>(
  "UpdateLessonUseCase",
  UpdateLessonUseCase
);

container.registerSingleton<IUseCase<string, void>>(
  "DeleteLessonUseCase",
  DeleteLessonUseCase
);

container.registerSingleton<IModuleController>(
  "IModuleController",
  ModuleController
);

container.registerSingleton<IModuleService>("IModuleService", ModuleService);

container.registerSingleton<IModuleRepository>(
  "IModuleRepository",
  ModuleRepository
);

container.registerSingleton<IUseCase<string, Module[]>>(
  "GetAllModulesUseCase",
  GetAllModulesUseCase
);

container.registerSingleton<IUseCase<string, void>>(
  "DeleteModuleUseCase",
  DeleteModuleUseCase
);

container.registerSingleton<
  IUseCase<
    {
      module: Module;
      courseId: string;
    },
    Module
  >
>("CreateModuleUseCase", CreateModuleUseCase);

container.registerSingleton<IUseCase<Module, Module>>(
  "UpdateModuleUseCase",
  UpdateModuleUseCase
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

container.registerSingleton<IUseCase<CreateEducationDto, Education | void>>(
  "EditEducationUseCase",
  EditEducationUseCase
);

container.registerSingleton<IUseCase<DeleteEducationDto, void>>(
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
container.registerSingleton<IUseCase<DeleteLanguageDto, void>>(
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
container.registerSingleton<IUseCase<{ user: User; role: string }, void>>(
  "UpdateRoleUseCase",
  UpdateRoleUseCase
);

container.registerSingleton<IExternarlAuthService>(
  "IAuthManagerService",
  KeycloakService
);

container.registerSingleton<ISearchService>(
  "ISearchService",
  ElasticSearchService
);

container.registerSingleton<IUseCase<QueryParamsDto, PageDto<Request>>>(
  "SearchRequestUseCase",
  SearchRequestUseCase
);

container.registerSingleton<IRequestService>("IRequestService", RequestService);

container.registerSingleton<IRequestController>(
  "IRequestController",
  RequestController
);

container.registerSingleton<IRequestRepository>(
  "IRequestRepository",
  RequestRepository
);
container.registerSingleton<
  IUseCase<{ userId: string; title: string }, Request[]>
>("GetUserActiveRequestUseCase", GetUserActiveRequestUseCase);
container.registerSingleton<IUseCase<string, void>>(
  "DeleteRequestUseCase",
  DeleteRequestUseCase
);
container.registerSingleton<IUseCase<Request, Request>>(
  "CreateRequestUseCase",
  CreateRequestUseCase
);

// Chats
container.registerSingleton<IChatController>("ChatController", ChatController);

container.registerSingleton<IChatService>("IChatService", ChatService);
container.registerSingleton<IMessageService>("IMessageService", MessageService);

container.registerSingleton<IUseCase<Chat, Chat>>(
  "CreateChatUseCase",
  CreateChatUsecase
);
container.registerSingleton<IUseCase<string, Chat>>(
  "GetChatByIdUseCase",
  GetChatByIdUseCase
);
container.registerSingleton<IUseCase<{ chatId: string; chat: Chat }, Chat>>(
  "UpdateChatUseCase",
  UpdateChatUseCase
);
container.registerSingleton<IUseCase<Message, Message>>(
  "CreateMessageUseCase",
  CreateMessageUseCase
);
container.registerSingleton<IUseCase<string, Chat[]>>(
  "GetChatsByUserIdUseCase",
  GetChatsByUserIdUseCase
);
container.registerSingleton<IUseCase<string, Message[]>>(
  "GetMessagesByChatIdUseCase",
  GetMessagesByChatIdUseCase
);
container.registerSingleton<IUseCase<{ chatId: string; userId: string }, void>>(
  "UpdateMessageStatusUseCase",
  UpdateMessageStatusUseCase
);

container.registerSingleton<IChatRepository>("IChatRepository", ChatRepository);
container.registerSingleton<IMessageRepository>(
  "IMessageRepository",
  MessageRepository
);

container.registerSingleton<IEnrollmentService>(
  "IEnrollmentService",
  EnrollmentService
);

container.registerSingleton<IEnrollmentController>(
  "IEnrollmentController",
  EnrollmentController
);

container.registerSingleton<IUseCase<Enrollment, Enrollment>>(
  "CreateEnrollmentUseCase",
  CreateEnrollmentUseCase
);

container.registerSingleton<GetEnrollmentByIdUseCase>(
  "GetEnrollmentByIdUseCase",
  GetEnrollmentByIdUseCase
);

container.registerSingleton<IUseCase<{ enrollmentId: string }, void>>(
  "CancelEnrollmentUseCase",
  CancelEnrollmentUseCase
);

container.registerSingleton<
  IUseCase<{ userId: string; courseId: string }, Enrollment | null>
>("CheckEnrollmentUseCase", CheckEnrollmentUseCase);

container.registerSingleton<IEnrollmentRepository>(
  "IEnrollmentRepository",
  EnrollmentRepository
);

container.registerSingleton<IEnrollmentService>(
  "IEnrollmentService",
  EnrollmentService
);

container.registerSingleton<IEnrollmentController>(
  "IEnrollmentController",
  EnrollmentController
);

container.registerSingleton<IUseCase<Enrollment, Enrollment>>(
  "CreateEnrollmentUseCase",
  CreateEnrollmentUseCase
);

container.registerSingleton<IUseCase<{ enrollmentId: string }, void>>(
  "CancelEnrollmentUseCase",
  CancelEnrollmentUseCase
);

container.registerSingleton<GetUserEnrollmentsUseCase>(
  "GetUserEnrollmentsUseCase",
  GetUserEnrollmentsUseCase
);

container.registerSingleton<IEnrollmentRepository>(
  "IEnrollmentRepository",
  EnrollmentRepository
);

container.registerSingleton<IClientService>("IClientService", ClientService);
container.registerSingleton<IClientController>(
  "IClientController",
  ClientController
);
container.registerSingleton<GetClientUseCase>(
  "GetClientUseCase",
  GetClientUseCase
);
container.registerSingleton<UpdateClientUseCase>(
  "UpdateClientUseCase",
  UpdateClientUseCase
);
container.registerSingleton<IClientRepository>(
  "IClientRepository",
  ClientRepository
);

// Proposals
container.registerSingleton<IProposalController>(
  "IProposalController",
  ProposalController
);

container.registerSingleton<IProposalService>(
  "IProposalService",
  ProposalService
);

container.registerSingleton<IUseCase<string, Proposal>>(
  "GetProposalByChatIdUseCase",
  GetProposalByChatIdUseCase
);
container.registerSingleton<
  IUseCase<{ proposalId: string; proposal: Proposal }, Proposal>
>("UpdateProposalUseCase", UpdateProposalUseCase);

container.registerSingleton<IUseCase<Proposal, Proposal>>(
  "CreateProposalUseCase",
  CreateProposalUseCase
);

container.registerSingleton<IProposalReposisory>(
  "IProposalRepository",
  ProposalRepository
);
container.registerSingleton<ICdnService>("ICdnService", CloudinaryService);
container.registerSingleton<IStudentTrackProgressRepository>(
  "IStudentTrackProgressRepository",
  StudentTrackProgressRepository
);

container.registerSingleton<CreateStudentTrackProgressUseCase>(
  "CreateStudentTrackProgressUseCase",
  CreateStudentTrackProgressUseCase
);

container.registerSingleton<GetStudentTrackProgressByEnrollmentUseCase>(
  "GetStudentTrackProgressByEnrollmentUseCase",
  GetStudentTrackProgressByEnrollmentUseCase
);

container.registerSingleton<GetStudentTrackProgressByIdUseCase>(
  "GetStudentTrackProgressByIdUseCase",
  GetStudentTrackProgressByIdUseCase
);

container.registerSingleton<UpdateStudentTrackProgressUseCase>(
  "UpdateStudentTrackProgressUseCase",
  UpdateStudentTrackProgressUseCase
);

container.registerSingleton<GetLessonByIdUseCase>(
  "GetLessonByIdUseCase",
  GetLessonByIdUseCase
);
container.registerSingleton<StudentTrackProgressController>(
  "StudentTrackProgressController",
  StudentTrackProgressController
);

container.registerSingleton<IStudentTrackProgressService>(
  "IStudentTrackProgressService",
  StudentTrackProgressService
);

container.registerSingleton<IP2PCourseController>(
  "IP2PCourseController",
  P2PCourseController
);

container.registerSingleton<IP2PCourseService>(
  "IP2PCourseService",
  P2PCourseService
);

container.registerSingleton<IPostRepository>("IPostRepository", PostRepository);

container.registerSingleton<ILiveSessionRepository>(
  "ILiveSessionRepository",
  LiveSessionRepository
);

container.registerSingleton<IFilePostRepository>(
  "IFilePostRepository",
  FilePostRepository
);

container.registerSingleton<IP2PCourseRepository>(
  "IP2PCourseRepository",
  P2PCourseRepository
);

container.registerSingleton<IUseCase<P2PCourse, P2PCourse>>(
  "CreateP2PCourseUseCase",
  CreateP2PCourseUseCase
);
container.registerSingleton<
  IUseCase<{ p2pCourse: P2PCourse; session: LiveSession }, LiveSession>
>("AddSessionUseCase", AddSessionUseCase);

container.registerSingleton<
  IUseCase<{ p2pCourse: P2PCourse; sessionId: string }, void>
>("RemoveSessionUseCase", RemoveSessionUseCase);

container.registerSingleton<
  IUseCase<{ p2pCourse: P2PCourse; session: LiveSession }, LiveSession>
>("EditSessionUseCase", EditSessionUseCase);

container.registerSingleton<
  IUseCase<{ p2pCourse: P2PCourse; sessionId: string }, LiveSession>
>("CompleteSessionUseCase", CompleteSessionUseCase);

container.registerSingleton<
  IUseCase<{ p2pCourse: P2PCourse; post: Post }, Post>
>("AddPostUseCase", AddPostUseCase);

container.registerSingleton<
  IUseCase<{ p2pCourse: P2PCourse; postId: string }, void>
>("RemovePostUseCase", RemovePostUseCase);

container.registerSingleton<
  IUseCase<{ p2pCourse: P2PCourse; post: Post }, Post>
>("EditPostUseCase", EditPostUseCase);

container.registerSingleton<
  IUseCase<{ p2pCourse: P2PCourse; filePost: FilePost }, FilePost>
>("AddFilePostUseCase", AddFilePostUseCase);

container.registerSingleton<
  IUseCase<{ p2pCourse: P2PCourse; filePostId: string }, void>
>("RemoveFilePostUseCase", RemoveFilePostUseCase);

container.registerSingleton<
  IUseCase<{ p2pCourseId: string; userId: string }, P2PCourse>
>("GetByUserIdAndCourseIdUseCase", GetByUserIdAndCourseIdUseCase);

container.registerSingleton<IUseCase<string, P2PCourse>>(
  "GetP2PCourseByIdUseCase",
  GetP2PCourseByIdUseCase
);

// dashboard
container.registerSingleton<IDashboardRepository>(
  "IDashboardRepository",
  DashboardRepository
);
container.registerSingleton<GetDashboardUseCase>(
  "GetDashboardUseCase",
  GetDashboardUseCase
);
container.registerSingleton<IDashboardService>(
  "IDashboardService",
  DashboardService
);
container.registerSingleton<IDashboardController>(
  "IDashboardController",
  DashboardController
);

container.registerSingleton<IP2PCourseController>(
  "IP2PCourseController",
  P2PCourseController
);

container.registerSingleton<IP2PCourseService>(
  "IP2PCourseService",
  P2PCourseService
);

container.registerSingleton<IPostRepository>("IPostRepository", PostRepository);

container.registerSingleton<ILiveSessionRepository>(
  "ILiveSessionRepository",
  LiveSessionRepository
);

container.registerSingleton<IFilePostRepository>(
  "IFilePostRepository",
  FilePostRepository
);

container.registerSingleton<IP2PCourseRepository>(
  "IP2PCourseRepository",
  P2PCourseRepository
);

container.registerSingleton<IUseCase<P2PCourse, P2PCourse>>(
  "CreateP2PCourseUseCase",
  CreateP2PCourseUseCase
);
container.registerSingleton<
  IUseCase<{ p2pCourse: P2PCourse; session: LiveSession }, LiveSession>
>("AddSessionUseCase", AddSessionUseCase);

container.registerSingleton<
  IUseCase<{ p2pCourse: P2PCourse; sessionId: string }, void>
>("RemoveSessionUseCase", RemoveSessionUseCase);

container.registerSingleton<
  IUseCase<{ p2pCourse: P2PCourse; session: LiveSession }, LiveSession>
>("EditSessionUseCase", EditSessionUseCase);

container.registerSingleton<
  IUseCase<{ p2pCourse: P2PCourse; sessionId: string }, LiveSession>
>("CompleteSessionUseCase", CompleteSessionUseCase);

container.registerSingleton<
  IUseCase<{ p2pCourse: P2PCourse; post: Post }, Post>
>("AddPostUseCase", AddPostUseCase);

container.registerSingleton<
  IUseCase<{ p2pCourse: P2PCourse; postId: string }, void>
>("RemovePostUseCase", RemovePostUseCase);

container.registerSingleton<
  IUseCase<{ p2pCourse: P2PCourse; post: Post }, Post>
>("EditPostUseCase", EditPostUseCase);

container.registerSingleton<
  IUseCase<{ p2pCourse: P2PCourse; filePost: FilePost }, FilePost>
>("AddFilePostUseCase", AddFilePostUseCase);

container.registerSingleton<
  IUseCase<{ p2pCourse: P2PCourse; filePostId: string }, void>
>("RemoveFilePostUseCase", RemoveFilePostUseCase);

container.registerSingleton<
  IUseCase<{ p2pCourseId: string; userId: string }, P2PCourse>
>("GetByUserIdAndCourseIdUseCase", GetByUserIdAndCourseIdUseCase);

container.registerSingleton<IUseCase<string, P2PCourse>>(
  "GetP2PCourseByIdUseCase",
  GetP2PCourseByIdUseCase
);

container.registerSingleton<ICdnService>("ICdnService", CloudinaryService);
container.registerSingleton<IStudentTrackProgressRepository>(
  "IStudentTrackProgressRepository",
  StudentTrackProgressRepository
);

container.registerSingleton<CreateStudentTrackProgressUseCase>(
  "CreateStudentTrackProgressUseCase",
  CreateStudentTrackProgressUseCase
);

container.registerSingleton<GetStudentTrackProgressByEnrollmentUseCase>(
  "GetStudentTrackProgressByEnrollmentUseCase",
  GetStudentTrackProgressByEnrollmentUseCase
);

container.registerSingleton<GetStudentTrackProgressByIdUseCase>(
  "GetStudentTrackProgressByIdUseCase",
  GetStudentTrackProgressByIdUseCase
);

container.registerSingleton<UpdateStudentTrackProgressUseCase>(
  "UpdateStudentTrackProgressUseCase",
  UpdateStudentTrackProgressUseCase
);

container.registerSingleton<GetLessonByIdUseCase>(
  "GetLessonByIdUseCase",
  GetLessonByIdUseCase
);
container.registerSingleton<StudentTrackProgressController>(
  "StudentTrackProgressController",
  StudentTrackProgressController
);

container.registerSingleton<IStudentTrackProgressService>(
  "IStudentTrackProgressService",
  StudentTrackProgressService
);

container.registerSingleton<ISearchService>(
  "ISearchService",
  ElasticSearchService
);

container.registerSingleton<SearchCourseUseCase>(
  "SearchCoursesUseCase",
  SearchCourseUseCase
);
export { container };
