import { Router } from "express";
import { container } from "tsyringe";
import FreelancerController from "../controllers/FreelancerController";
const controller = container.resolve(FreelancerController);

const router = Router();

/**
 * @openapi
 *
 * /freelancers/{freelancerId}/skill:
 *  get:
 *      summary: Retrieves the freelancer skills
 *      tags:
 *       - Skill
 *      parameters:
 *       - in: path
 *         name: freelancerId
 *         required: true
 *         description: The ID of the freelancer
 *         schema:
 *           type: string
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
 * /freelancers/{freelancerId}/skill:
 *  post:
 *      summary: add a new skill to the freelancer
 *      tags:
 *       - Skill
 *      parameters:
 *       - in: path
 *         name: freelancerId
 *         required: true
 *         description: The ID of the freelancer
 *         schema:
 *           type: string
 *      requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                           type: object
 *                           properties:
 *                                  name:
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
 * /freelancers/{freelancerId}/skill:
 *  delete:
 *      summary: add a new skill to the freelancer
 *      tags:
 *       - Skill
 *      parameters:
 *       - in: path
 *         name: freelancerId
 *         required: true
 *         description: The ID of the freelancer
 *         schema:
 *           type: string
 *      requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                           type: object
 *                           properties:
 *                                  name:
 *                                      type: string
 *                                      example: react
 *                                  level:
 *                                      type: string
 *                                      example: beginner
 *                                  skillId:
 *                                      type: string
 *                                      example: 6802cee0-72e1-4432-94a6-6a16808a86ab
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
 * /freelancers/{freelancerId}/skill:
 *  put:
 *      summary: add a new skill to the freelancer
 *      tags:
 *       - Skill
 *      parameters:
 *       - in: path
 *         name: freelancerId
 *         required: true
 *         description: The ID of the freelancer
 *         schema:
 *           type: string
 *      requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                           type: object
 *                           properties:
 *                                  name:
 *                                      type: string
 *                                      example: react
 *                                  level:
 *                                      type: string
 *                                      example: beginner
 *                                  skillId:
 *                                      type: string
 *                                      example: 6802cee0-72e1-4432-94a6-6a16808a86ab
 *
 *      responses:
 *          201:
 *              description: Everything is ok and returns skill
 *          500:
 *              description: Everything is wrong
 *
 */
router.put("/:freelancerId/skill", controller.editSkill);

export default router;
