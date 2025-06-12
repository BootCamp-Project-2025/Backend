import { Router } from "express";
import { container } from "tsyringe";
import { CourseController } from "../controllers/CourseController";

const courseController = container.resolve<CourseController>(CourseController);

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
courseRouter.get("/", courseController.getAllCourses);

export default courseRouter;
