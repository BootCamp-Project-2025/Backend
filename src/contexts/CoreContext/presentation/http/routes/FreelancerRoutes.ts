import { Router } from "express";
import { container } from "tsyringe";
const controller = container.resolve(CourseController);

const router = Router();

/**
 * @openapi
 * users/:id:
 *  get:
 *      summary: Retrieves the user with the id :id
 *      responses:
 *          200:
 *              description: Everything is ok and returns user
 *          500:
 *              description: Everything is wrong
 *
 */
router.get("/:id", controller.get);

/**
 * @openapi
 * users/:
 *  post:
 *      summary: saves the user with the id :id
 *      requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                           type: object
 *                           properties:
 *                                  userName:
 *                                      type: string
 *                                      example: Pepe
 *                                  userEmail:
 *                                      type: string
 *                                      example: Pepe@gmail.com
 *
 *      responses:
 *          201:
 *              description: Everything is ok and returns user
 *          404:
 *              description: user not found
 *          500:
 *              description: Everything is wrong
 *
 */
router.post("/", controller.post);

/**
 * @openapi
 * users/:id/freelance:
 *  put:
 *      summary: Enables the user as freelancer with the id :id
 *      responses:
 *          200:
 *              description: User enabled and freelancer profile created
 *          500:
 *              description: Everything is wrong
 *
 */
router.put("/:id/freelance", controller.freelance);

//---------About
/**
 * @openapi
 * /users/:id/freelancer/about:
 *  get:
 *      summary: Gets the 'about' field of the freelancer
 *      responses:
 *          200:
 *              description: About del freelancer
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              about:
 *                                  type: string
 *                                  example: "Im a dev full stack..."
 *          404:
 *              description: Freelancer no encontrado
 *          500:
 *              description: Error interno
 */
router.get("/:id/freelance/about", controller.getAbout);

/**
 * @openapi
 * /users/:id/freelancer/about:
 *   put:
 *     summary: Updates the about section of the freelancer profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               about:
 *                 type: string
 *                 example: Im an englishh teacher with 10 years of experience
 *     responses:
 *       200:
 *         description: About section updated
 *       404:
 *         description: User or freelancer profile not found
 *       500:
 *         description: Server error
 */
router.put("/:id/freelance/about", controller.updateAbout);

export default router;
