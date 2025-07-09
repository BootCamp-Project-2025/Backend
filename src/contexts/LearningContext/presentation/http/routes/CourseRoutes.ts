import { Router } from "express";
import { container } from "tsyringe";
import { CourseController } from "../controllers/CourseController";

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
 * /courses/:id:
 *   get:
 *     summary: Retrieve a course by id
 *     tags:
 *       - Courses
 *     responses:
 *       200:
 *         description: return the course
 */
courseRouter.get("/:id", controller.getCourse);
/**
 * @openapi
 * /courses/:id:
 *   put:
 *     summary: update a course
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
 *       200:
 *         description: return the course
 */
courseRouter.put("/:id", controller.editCourse);
/**
 * @openapi
 * /courses/:id:
 *   delete:
 *     summary: delete a course by id
 *     tags:
 *       - Courses
 *     responses:
 *       200:
 *         description: course deleted
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
courseRouter.post("/", async (req, res, next) => {
  try {
    await controller.create(req, res);
  } catch (err) {
    next(err);
  }
});

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
courseRouter.put("/:id", async (req, res, next) => {
  try {
    await controller.updateCourse(req, res);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     tags:
 *       - Courses
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
courseRouter.delete("/:id", async (req, res, next) => {
  try {
    await controller.deleteCourse(req, res);
  } catch (err) {
    next(err);
  }
});

export default courseRouter;
