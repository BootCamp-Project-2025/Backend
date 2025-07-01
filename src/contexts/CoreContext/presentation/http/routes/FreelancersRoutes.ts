import { Router } from "express";
import { container } from "tsyringe";
import FreelancerController from "../controllers/FreelancerController";
import LanguageController from "../controllers/LanguageController";

const languageController = container.resolve(LanguageController);
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

//---------Language
/**
 * @openapi
 *
 * /freelancers/{freelancerId}/languages:
  
 *  get:
 *      summary: Retrieves the freelancer languages
 *      tags:
 *       - Language
 *      parameters:
 *       - in: path
 *         name: freelancerId
 *         required: true
 *         description: The ID of the freelancer
 *         schema:
 *           type: string
 *      responses:
 *          200:
 *              description: Everything is ok and returns freelancer languages
 *          500:
 *              description: Everything is wrong
 *
 */
router.get("/:freelancerId/languages", languageController.getLanguages);

/**
 * @openapi
 * /freelancers/{freelancerId}/languages:
 *  post:
 *      summary: add a new language to the freelancer
 *      tags:
 *       - Language
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
 *                                      example: English
 *                                  level:
 *                                      type: string
 *                                      example: intermediate
 *
 *      responses:
 *          201:
 *              description: Everything is ok and returns language
 *          500:
 *              description: Everything is wrong
 *
 */
router.post("/:freelancerId/languages", languageController.addLanguage);

/**
 * @openapi
 * /freelancers/{freelancerId}/languages:
 *   put:
 *     summary: Updates a language of the freelancer
 *     tags:
 *       - Language
 *     parameters:
 *       - in: path
 *         name: freelancerId
 *         required: true
 *         description: The ID of the freelancer
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 98039295-6af2-465e-a254-0f24d40dc672
 *               name:
 *                 type: string
 *                 example: English
 *               level:
 *                 type: string
 *                 example: advanced
 *     responses:
 *       200:
 *         description: freelancer language updated
 *       404:
 *         description: freelancer or language not found
 *       500:
 *         description: Server error
 *
 */
router.put("/:freelancerId/languages", languageController.editLanguage);

/**
 * @openapi
 * /freelancers/{freelancerId}/languages:
 *   delete:
 *     summary: Delete a language of the freelancer
 *     tags:
 *       - Language
 *     parameters:
 *       - in: path
 *         name: freelancerId
 *         required: true
 *         description: The ID of the freelancer
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 98039295-6af2-465e-a254-0f24d40dc672
 *               name:
 *                 type: string
 *                 example: English
 *               level:
 *                 type: string
 *                 example: advanced
 *     responses:
 *       200:
 *         description: Freelancer language deleted
 *       404:
 *         description: Freelancer or language not found
 *       500:
 *         description: Server error
 */
router.delete("/:freelancerId/languages", languageController.deleteLanguage);

//---------About
/**
 * @openapi
 * /freelancers/{freelancerId}/about:
 *  get:
 *      summary: Gets the 'about' field of the freelancer
 *      responses:
 *          200:
 *              description: About of the freelancer
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
router.get("/:freelancerId/about", controller.getAbout);

/**
 * @openapi
 * /freelancers/{freelancerId}/about:
 *   put:
 *     summary: Updates the about section of the freelancer profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the freelancer
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
 *         description: Freelancer profile not found
 *       500:
 *         description: Server error
 */
router.put("/:freelanceId/about", controller.updateAbout);

export default router;
