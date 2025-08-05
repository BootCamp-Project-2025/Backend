import { Router } from "express";
import { container } from "tsyringe";
import { CourseController } from "../controllers/CourseController";
import { verifyToken } from "@/contexts/Shared/infrastructure/middlewares/TokenVerifierMiddleware";

import ModuleController from "../controllers/ModuleController";

const courseRouter = Router();
const moduleController = container.resolve(ModuleController);
const controller = container.resolve(CourseController);

/**
 * @openapi
 * /courses/search:
 *   get:
 *     summary: Search courses
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search term to match course name, description, module titles, or lesson descriptions
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter courses by category
 *       - in: query
 *         name: subcategory
 *         schema:
 *           type: string
 *         description: Filter courses by subcategory
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *         description: Filter courses by language
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Page number for pagination
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Number of results per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Field to sort by (e.g., name, description, createdAt)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order direction
 *     responses:
 *       200:
 *         description: Courses matching search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Course'
 *                 page:
 *                   type: integer
 *                 size:
 *                   type: integer
 *                 total:
 *                   type: integer
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */

courseRouter.get("/search", controller.search);

/**
 * @openapi
 * /courses/{courseId}/modules:
 *   get:
 *     summary: Get all the modules of a course
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: The ID of the course
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of courses
 */
courseRouter.get("/:courseId/modules", moduleController.getAll);

/**
 * @openapi
 * /courses/{courseId}/modules:
 *   post:
 *     summary: Add a new module to the course
 *     tags:
 *       - Courses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ModuleDto'
 *     responses:
 *       200:
 *         description: A list of courses
 */
courseRouter.post("/:id/modules", moduleController.create);

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
 * /courses/{id}/publish:
 *   put:
 *     summary: Publish or unpublish a course
 *     description: >
 *       Updates the published state of a course by its ID.
 *       - Set published: true to publish the course.
 *       - Set published: false to unpublish the course.
 *       This controls the visibility of the course for users.
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - published
 *             properties:
 *               published:
 *                 type: boolean
 *                 description: Whether to publish (`true`) or unpublish (`false`) the course
 *                 example: true
 *     responses:
 *       200:
 *         description: The publication status of the course was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 published:
 *                   type: boolean
 *                   description: Final state of the course after the update
 *                   example: false
 *       400:
 *         description: Invalid input,published is missing or not boolean
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error while updating the course
 */

courseRouter.put("/:id/publish", controller.publish);

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
