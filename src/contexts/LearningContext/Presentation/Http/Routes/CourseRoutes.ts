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
 * components:
 *   schemas:
 *     CourseDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         field:
 *           type: string
 *         requirements:
 *           type: string
 *         time:
 *           type: integer
 *           example: 10
 *         description:
 *           type: string
 *       required:
 *         - id
 *         - name
 *         - field
 *         - requirements
 *         - time
 *         - description
 */

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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CourseDTO'
 */
courseRouter.get("/", controller.getAllCourses.bind(controller));

export default courseRouter;
