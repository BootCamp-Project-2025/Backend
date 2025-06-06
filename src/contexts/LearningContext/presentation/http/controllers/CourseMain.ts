import { CourseController } from "../controllers/CourseController";
import { CourseRepository } from "../../../infrastructure/database/CourseRepository";
import { CourseService } from "../../../infrastructure/services/CourseService";
import { GetAllCoursesUseCase } from "../../../aplication/useCases/GetAllCoursesUseCase";

const courseRepository = new CourseRepository();
const getAllCoursesUseCase = new GetAllCoursesUseCase(courseRepository);
const courseService = new CourseService(getAllCoursesUseCase);
export const controller = new CourseController(courseService);
