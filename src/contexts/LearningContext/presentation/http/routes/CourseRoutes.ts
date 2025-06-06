import { Router } from "express";
import { CourseController } from "../controllers/CourseController";
import { CourseRepository } from "../../../infrastructure/database/CourseRepository";
import { CourseService } from "../../../infrastructure/services/CourseService";
import { GetAllCoursesUseCase } from "../../../aplication/useCases/GetAllCoursesUseCase";

const courseRepository = new CourseRepository();
const getAllCoursesUseCase = new GetAllCoursesUseCase(courseRepository);
const courseService = new CourseService(getAllCoursesUseCase);
const controller = new CourseController(courseService);

const courseRouter = Router();

/**
 * @openapi
 * /courses:
 *   get:
 *     summary: Retrieve all courses
 *     tags:
 *       - Courses
 *     responses:
 *       200:
 *         description: A list of courses
 */
courseRouter.get("/", controller.getAllCourses);

export default courseRouter;
