import { Router } from "express";
import { controller } from "../controllers/CourseMain";

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
