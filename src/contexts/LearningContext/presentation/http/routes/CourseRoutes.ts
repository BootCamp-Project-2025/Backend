import { Router } from "express";
import { CourseController } from "../controllers/CourseController";
import { CourseRepository } from "../../../infrastructure/database/CourseRepository";
import { CourseService } from "../../../infrastructure/services/CourseService";
import { GetAllCoursesUseCase } from "../../../application/useCases/GetAllCoursesUseCase";
import { CreateCourseUseCase } from "@/contexts/LearningContext/application/useCases/CreateCourseUseCase";

const courseRepository = new CourseRepository();
const getAllCoursesUseCase = new GetAllCoursesUseCase(courseRepository);
const createCourseUseCase = new CreateCourseUseCase(courseRepository);
const courseService = new CourseService(
  getAllCoursesUseCase,
  createCourseUseCase
);
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

/**
 * @openapi
 * /courses:
 *   post:
 *     summary: Create a new course
 *     tags:
 *       - Courses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - imgSrc
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Curso de TypeScript"
 *               description:
 *                 type: string
 *                 example: "Aprende a usar TypeScript en proyectos reales"
 *               imgSrc:
 *                 type: string
 *                 example: "https://example.com/img.png"
 *     responses:
 *       201:
 *         description: Course created successfully
 */
courseRouter.post("/", async (req, res, next) => {
  try {
    await controller.create(req, res);
  } catch (err) {
    next(err);
  }
});

export default courseRouter;
