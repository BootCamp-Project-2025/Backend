import { Router } from "express";
import { container } from "tsyringe";
import FreelancerController from "../controllers/FreelancerController";
const controller = container.resolve(FreelancerController);

const router = Router();

/**
 * @openapi
 *
 * /freelancers/:freelancerId/skill:
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
 * /freelancers/:freelancerId/skill:
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
 * /freelancers/:freelancerId/skill:
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
 * /freelancers/:freelancerId/skill:
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

export default router;
