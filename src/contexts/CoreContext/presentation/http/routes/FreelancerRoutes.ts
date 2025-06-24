import { Router } from "express";
import { container } from "tsyringe";
import LanguageController from "../controllers/LanguageController";

const languageController = container.resolve(LanguageController);

const router = Router();

//---------Language
/**
 * @openapi
 *
 * freelancers/:freelancerId/languages:
 *  get:
 *      summary: Retrieves the freelancer languages
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
 * freelancers/:freelancerId/languages:
 *  post:
 *      summary: add a new language to the freelancer
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
 * freelancers/:freelancerId/languages:
 *   put:
 *     summary: Updates a language of the freelancer
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
 *                                      example: advanced
 *     responses:
 *       200:
 *         description: freelancer language updated
 *       404:
 *         description: freelancer or language not found
 *       500:
 *         description: Server error
 */
router.put("/:freelancerId/languages", languageController.editLanguage);

/**
 * @openapi
 * freelancers/:freelancerId/languages:
 *   delete:
 *     summary: delete a language of the freelancer
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
 *                                      example: advanced
 *     responses:
 *       200:
 *         description: freelancer language deleted
 *       404:
 *         description: freelancer or language not found
 *       500:
 *         description: Server error
 */
router.delete("/:freelancerId/languages", languageController.deleteLanguage);

export default router;
