import { Router } from "express";
import { container } from "tsyringe";
import FreelancerController from "../controllers/FreelancerController";
const controller = container.resolve(FreelancerController);

const router = Router();

/**
 * @openapi
 *
 * freelancers/:freelancerId/skill:
 *  get:
 *      summary: Retrieves the freelancer skills
 *      responses:
 *          200:
 *              description: Everything is ok and returns user
 *          500:
 *              description: Everything is wrong
 *
 */
router.get("/:freelancerId/skill", controller.getSkills);

/**
 * @openapi
 * freelancers/:freelancerId/skill:
 *  post:
 *      summary: add a new skill to the freelancer
 *      requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                           type: object
 *                           properties:
 *                                  skill:
 *                                      type: string
 *                                      example: react
 *                                  level:
 *                                      type: string
 *                                      example: beginner
 *
 *      responses:
 *          201:
 *              description: Everything is ok and returns skill
 *          500:
 *              description: Everything is wrong
 *
 */
router.post("/:freelancerId/skill", controller.addSkill);

/**
 * @openapi
 * freelancers/:freelancerId/skill:
 *  delete:
 *      summary: add a new skill to the freelancer
 *      requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                           type: object
 *                           properties:
 *                                  skill:
 *                                      type: string
 *                                      example: react
 *                                  level:
 *                                      type: string
 *                                      example: beginner
 *
 *      responses:
 *          201:
 *              description: Everything is ok and returns skill
 *          500:
 *              description: Everything is wrong
 *
 */
router.delete("/:freelancerId/skill", controller.deleteSkill);

/**
 * @openapi
 * freelancers/:freelancerId/skill:
 *  put:
 *      summary: add a new skill to the freelancer
 *      requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                           type: object
 *                           properties:
 *                                  skill:
 *                                      type: string
 *                                      example: react
 *                                  level:
 *                                      type: string
 *                                      example: beginner
 *
 *      responses:
 *          201:
 *              description: Everything is ok and returns skill
 *          500:
 *              description: Everything is wrong
 *
 */
router.put("/:freelancerId/skill", controller.editSkill);

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
