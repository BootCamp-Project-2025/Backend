import { Router } from "express";
import { container } from "@/di-container";
import FreelancerController from "../controllers/FreelancerController";

export const SkillRoutes = Router({ mergeParams: true });
const controller = container.resolve(FreelancerController);

/**
 * @openapi
 *
 * /freelancers/{freelancerId}/skills:
 *  get:
 *      summary: Get all skills of a freelancer
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
SkillRoutes.get("", controller.getSkills);

/**
 * @openapi
 * /freelancers/{freelancerId}/skills:
 *  post:
 *      summary: Create a new skill for a freelancer
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
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Skill'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Skill'
 *      responses:
 *          201:
 *              description: Everything is ok and returns skill
 *          500:
 *              description: Everything is wrong
 *
 */
SkillRoutes.post("", controller.addSkill);

/**
 * @openapi
 * /freelancers/{freelancerId}/skills/{skillId}:
 *  put:
 *      summary: Update a skill of a freelancer
 *      tags:
 *       - Skill
 *      parameters:
 *       - in: path
 *         name: freelancerId
 *         required: true
 *         description: The ID of the freelancer
 *         schema:
 *           type: string
 *       - in: path
 *         name: skillId
 *         schema:
 *           type: string
 *         required: true
 *      requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Skill'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Skill'
 *      responses:
 *          201:
 *              description: Everything is ok and returns skill
 *          500:
 *              description: Everything is wrong
 *
 */
SkillRoutes.put("/:skillId", controller.editSkill);

/**
 * @openapi
 * /freelancers/{freelancerId}/skills/{skillId}:
 *  delete:
 *      summary: Delete a skill of a freelancer
 *      tags:
 *       - Skill
 *      parameters:
 *       - in: path
 *         name: freelancerId
 *         required: true
 *         description: The ID of the freelancer
 *         schema:
 *           type: string
 *       - in: path
 *         name: skillId
 *         schema:
 *           type: string
 *         required: true
 *
 *      responses:
 *          204:
 *              description: Skill deleted successfully
 *          500:
 *              description: Everything is wrong
 *
 */
SkillRoutes.delete("/:skillId", controller.deleteSkill);

/**
 * @openapi
 * components:
 *   schemas:
 *     Skill:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the skill
 *           example: "React"
 *         level:
 *           type: string
 *           description: Level of the skill
 *           example: "beginner"
 *           default: "beginner"
 *           enum:
 *             - begginer
 *             - intermediate
 *             - advanced
 *       required:
 *         - name
 *         - level
 */
