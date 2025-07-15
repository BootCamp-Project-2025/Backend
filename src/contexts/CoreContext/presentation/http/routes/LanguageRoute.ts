import { Router } from "express";
import { container } from "@/di-container";
import LanguageController from "../controllers/LanguageController";
import { verifyToken } from "@/contexts/Shared/infrastructure/middlewares/TokenVerifierMiddleware";

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
 *          401:
 *              description: Invalid or missing token
 *          403:
 *              description: Forbidden access
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
 *      security:
 *      - BearerAuth: []
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
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Language'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Language'
 *      responses:
 *          201:
 *              description: Everything is ok and returns language
 *          401:
 *              description: Invalid or missing token
 *          403:
 *              description: Forbidden access
 *          500:
 *              description: Everything is wrong
 *
 */
LanguageRoutes.post("", verifyToken(["FREELANCER"]), controller.addLanguage);

/**
 * @openapi
 * /freelancers/{freelancerId}/languages/{languageId}:
 *   put:
 *     summary: Update a language of a freelancer
 *     security:
 *      - BearerAuth: []
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
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Language'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Language'
 *     responses:
 *       200:
 *         description: freelancer language updated
 *       401:
 *         description: Invalid or missing token
 *       403:
 *         description: Forbidden access
 *       404:
 *         description: freelancer or language not found
 *       500:
 *         description: Server error
 *
 */
LanguageRoutes.put(
  "/:languageId",
  verifyToken(["FREELANCER"]),
  controller.editLanguage
);

/**
 * @openapi
 * /freelancers/{freelancerId}/languages/{languageId}:
 *   delete:
 *     summary: Delete a language of a freelancer
 *     security:
 *      - BearerAuth: []
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
 *       204:
 *         description: Freelancer language deleted
 *       401:
 *         description: Invalid or missing token
 *       403:
 *         description: Forbidden access
 *       404:
 *         description: Freelancer or language not found
 *       500:
 *         description: Server error
 */
LanguageRoutes.delete(
  "/:languageId",
  verifyToken(["FREELANCER"]),
  controller.deleteLanguage
);

/**
 * @openapi
 * components:
 *   schemas:
 *     Language:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the language
 *           example: "Spanish"
 *         level:
 *           type: string
 *           description: Level of the language
 *           example: "Advanced"
 *           default: "basic"
 *           enum:
 *             - basic
 *             - intermediate
 *             - advanced
 *             - native
 *       required:
 *         - name
 *         - level
 */
