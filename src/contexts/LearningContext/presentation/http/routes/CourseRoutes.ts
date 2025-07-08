import { Router } from "express";
import { container } from "tsyringe";
import { CourseController } from "../controllers/CourseController";
import moduleRouter from "./ModuleRoutes";

const courseRouter = Router();
const controller = container.resolve(CourseController);

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
 *   put:
 *     summary: mark a course as published
 *     tags:
 *       - Courses
 *     responses:
 *       200:
 *         description: A list of courses
 */
courseRouter.put("/:id/publish", controller.publish);

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

courseRouter.use("/:courseId/modules", moduleRouter);
courseRouter.use("/modules", moduleRouter);

export default courseRouter;
