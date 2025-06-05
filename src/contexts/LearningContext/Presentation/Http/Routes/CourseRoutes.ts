import { Router } from "express";
import { CourseController } from "../Controllers/CourseController";
import { CourseRepository } from "../../../Infrastructure/Database/CourseRepository";
import { CourseService } from "../../../Infrastructure/Services/CourseService";

const courseRepository = new CourseRepository();
const courseService = new CourseService(courseRepository);
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
courseRouter.get("/", controller.getAllCourses.bind(controller));

export default courseRouter;
