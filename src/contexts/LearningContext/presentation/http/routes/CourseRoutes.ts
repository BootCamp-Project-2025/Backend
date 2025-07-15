import { Router } from "express";
import { container } from "tsyringe";
import { CourseController } from "../controllers/CourseController";
import { verifyToken } from "@/contexts/Shared/infrastructure/middlewares/TokenVerifierMiddleware";

const courseRouter = Router();
const controller = container.resolve(CourseController);

/**
 * @openapi
 * /courses:
 *   get:
 *     summary: Get all courses
 *     tags:
 *       - Course
 *     responses:
 *       200:
 *         description: A list of courses
 */
courseRouter.get("/", controller.getAllCourses);

/**
 * @openapi
 * /courses/{id}:
 *   get:
 *     summary: Retrieve a course by id
 *     tags:
 *       - Course
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course ID
 *     responses:
 *       200:
 *         description: return the course
 */
courseRouter.get("/:id", controller.getCourse);

/**
 * @openapi
 * /courses/{id}:
 *   put:
 *     summary: Update an existing course
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               imgSrc:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course updated successfully
 */
courseRouter.put("/:id", controller.editCourse);

/**
 * @openapi
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     tags:
 *       - Course
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course ID
 *     responses:
 *       204:
 *         description: Course deleted successfully (no content)
 */
courseRouter.delete("/:id", controller.delete);

/**
 * @openapi
 * /courses:
 *   post:
 *     summary: Create a new course
 *     tags:
 *       - Course
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
courseRouter.post("/", verifyToken(), async (req, res, next) => {
  try {
    await controller.create(req, res);
  } catch (err) {
    next(err);
  }
});

export default courseRouter;

/**
 * @openapi
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the course
 *           example: "Basic Programming with C++"
 *         description:
 *           type: string
 *           description: Description of the course
 *           example: "This is my first course"
 *         imgSrc:
 *           type: string
 *           description: Url of the image in the CDN
 *           example: "https://cdn.com/mycourse.png"
 *         category:
 *           type: string
 *           description: Category of the course
 *           example: "Programming"
 *         subCategory:
 *           type: string
 *           description: Sub Category of the course
 *           example: "basic"
 *         language:
 *           type: string
 *           description: Language of the course
 *           example: "English"
 *         time:
 *           type: string
 *           description: Time of the course in minutes
 *           example: 120
 *         requirements:
 *           type: string
 *           description: Requirements of the course
 *           example: "Having a computer"
 *       required:
 *         - name
 *         - description
 *         - imgSrc
 */
