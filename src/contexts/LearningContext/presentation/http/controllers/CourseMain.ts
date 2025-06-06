import { CourseController } from "../controllers/CourseController";
import { CourseRepository } from "../../../infraestructure/database/CourseRepository";
import { CourseService } from "../../../infraestructure/services/CourseService";
import { GetAllCoursesUseCase } from "../../../application/useCases/GetAllCoursesUseCase";
import { CreateCourseUseCase } from "@/contexts/LearningContext/application/useCases/CreateCourseUseCase";

const courseRepository = new CourseRepository();
const getAllCoursesUseCase = new GetAllCoursesUseCase(courseRepository);
const createCourseUseCase = new CreateCourseUseCase(courseRepository);
const courseService = new CourseService(
  getAllCoursesUseCase,
  createCourseUseCase
);
export const controller = new CourseController(courseService);
