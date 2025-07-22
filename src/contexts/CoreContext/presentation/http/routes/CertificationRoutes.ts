import { Router } from "express";
import { container } from "@/di-container";
import { CertificationController } from "../controllers/CertificationController";
import { verifyToken } from "@/contexts/Shared/infrastructure/middlewares/TokenVerifierMiddleware";

export const CertificationRoutes = Router({ mergeParams: true });
const controller = container.resolve(CertificationController);

/**
 * @openapi
 * /freelancers/{freelancerId}/certifications:
 *   get:
 *     summary: Get all certifications of a freelancer
 *     tags:
 *       - Certification
 *     parameters:
 *       - in: path
 *         name: freelancerId
 *         required: true
 *         description: The ID of the freelancer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of certifications for the freelancer
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden access
 */
CertificationRoutes.get("", controller.getAll.bind(controller));

/**
 * @openapi
 * /freelancers/{freelancerId}/certifications:
 *   post:
 *     summary: Create a new certification for a freelancer
 *     security:
 *      - BearerAuth: []
 *     tags:
 *       - Certification
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
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Certification'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Certification'
 *     responses:
 *       201:
 *         description: Certification created successfully
 *       401:
 *         description: Invalid or missing token
 *       403:
 *         description: Forbidden access
 */
CertificationRoutes.post(
  "",
  verifyToken(["FREELANCER"]),
  controller.create.bind(controller)
);

/**
 * @openapi
 * /freelancers/{freelancerId}/certifications/{certificationId}:
 *   put:
 *     summary: Update a certification of a freelancer
 *     security:
 *      - BearerAuth: []
 *     tags:
 *       - Certification
 *     parameters:
 *       - in: path
 *         name: freelancerId
 *         required: true
 *         description: The ID of the freelancer
 *         schema:
 *           type: string
 *       - in: path
 *         name: certificationId
 *         required: true
 *         description: The ID of the certification to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Certification'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Certification'
 *     responses:
 *       204:
 *         description: Certification updated successfully
 *       401:
 *         description: Invalid or missing token
 *       403:
 *         description: Forbidden access
 *
 */
CertificationRoutes.put(
  "/:certificationId",
  verifyToken(["FREELANCER"]),
  controller.update.bind(controller)
);

/**
 * @openapi
 * /freelancers/{freelancerId}/certifications/{certificationId}:
 *   delete:
 *     summary: Delete a certification of a freelancer
 *     security:
 *      - BearerAuth: []
 *     tags:
 *       - Certification
 *     parameters:
 *       - in: path
 *         name: freelancerId
 *         required: true
 *         description: The ID of the freelancer
 *         schema:
 *           type: string
 *       - in: path
 *         name: certificationId
 *         required: true
 *         description: The ID of the certification to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Certification deleted successfully
 *       401:
 *         description: Invalid or missing token
 *       403:
 *         description: Forbidden access
 *       404:
 *         description: Certification not found
 *
 */
CertificationRoutes.delete(
  "/:certificationId",
  verifyToken(["FREELANCER"]),
  controller.delete.bind(controller)
);

/**
 * @openapi
 * components:
 *   schemas:
 *     Certification:
 *       type: object
 *       properties:
 *         certification:
 *           type: string
 *           description: Name of the certification
 *           example: "AWS Certified Developer"
 *         institution:
 *           type: string
 *           description: Institution that issued the certification
 *           example: "Amazon"
 *         year:
 *           type: integer
 *           format: int32
 *           description: Year the certification was obtained
 *           example: 2024
 *       required:
 *         - certification
 *         - institution
 *         - year
 */
