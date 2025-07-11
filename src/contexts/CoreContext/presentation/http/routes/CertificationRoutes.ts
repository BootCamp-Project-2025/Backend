import { Router } from "express";
import { container } from "@/di-container";
import { CertificationController } from "../controllers/CertificationController";

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
 */
CertificationRoutes.get("", controller.getAll.bind(controller));

/**
 * @openapi
 * /freelancers/{freelancerId}/certifications:
 *   post:
 *     summary: Create a new certification for a freelancer
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
 */
CertificationRoutes.post("", controller.create.bind(controller));

/**
 * @openapi
 * /freelancers/{freelancerId}/certifications/{certificationId}:
 *   put:
 *     summary: Update a certification of a freelancer
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
 */
CertificationRoutes.put(
  "/:certificationId",
  controller.update.bind(controller)
);

/**
 * @openapi
 * /freelancers/{freelancerId}/certifications/{certificationId}:
 *   delete:
 *     summary: Delete a certification of a freelancer
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
 */
CertificationRoutes.delete(
  "/:certificationId",
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
