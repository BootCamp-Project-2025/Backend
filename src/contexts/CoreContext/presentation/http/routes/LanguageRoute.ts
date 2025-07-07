import { Router } from "express";
import { container } from "@/di-container";
import LanguageController from "../controllers/LanguageController";

export const LanguageRoutes = Router({ mergeParams: true });
const controller = container.resolve(LanguageController);

/**
 * @openapi
 *
 * /freelancers/{freelancerId}/languages:
  
 *  get:
 *      summary: Get all languages of a freelancer
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
LanguageRoutes.get("", controller.getLanguages);

/**
 * @openapi
 * /freelancers/{freelancerId}/languages:
 *  post:
 *      summary: Create a new language for a freelancer
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
LanguageRoutes.post("", controller.addLanguage);

/**
 * @openapi
 * /freelancers/{freelancerId}/languages/{languageId}:
 *   put:
 *     summary: Update a language of a freelancer
 *     tags:
 *       - Language
 *     parameters:
 *       - in: path
 *         name: freelancerId
 *         required: true
 *         description: The ID of the freelancer
 *         schema:
 *           type: string
 *       - in: path
 *         name: languageId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
LanguageRoutes.put("/:languageId", controller.editLanguage);

/**
 * @openapi
 * /freelancers/{freelancerId}/languages/{languageId}:
 *   delete:
 *     summary: Delete a language of a freelancer
 *     tags:
 *       - Language
 *     parameters:
 *       - in: path
 *         name: freelancerId
 *         required: true
 *         description: The ID of the freelancer
 *         schema:
 *           type: string
 *       - in: path
 *         name: languageId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Freelancer language deleted
 *       404:
 *         description: Freelancer or language not found
 *       500:
 *         description: Server error
 */
LanguageRoutes.delete("/:languageId", controller.deleteLanguage);
