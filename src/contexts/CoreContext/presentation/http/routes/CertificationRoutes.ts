import { Router } from "express";
import { container } from "@/di-container";
import { CertificationController } from "../controllers/CertificationController";

const router = Router();
const controller = container.resolve(CertificationController);

/**
 * @openapi
 * /freelancers/{id}/certifications:
 *   get:
 *     summary: Get all certifications of a freelancer
 *     tags:
 *       - Certification
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the freelancer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of certifications for the freelancer
 */
router.get("/:id/certifications", controller.getAll.bind(controller));

/**
 * @openapi
 * /freelancers/{id}/certifications:
 *   post:
 *     summary: Create a new certification for a freelancer
 *     tags:
 *       - Certification
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the freelancer
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CertificationDTO'
 *     responses:
 *       201:
 *         description: Certification created successfully
 */
router.post("/:id/certifications", controller.create.bind(controller));

/**
 * @openapi
 * /freelancers/{id}/certifications/{certificationId}:
 *   put:
 *     summary: Update a certification of a freelancer
 *     tags:
 *       - Certification
 *     parameters:
 *       - in: path
 *         name: id
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
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CertificationDTO'
 *     responses:
 *       204:
 *         description: Certification updated successfully
 */
router.put(
  "/:id/certifications/:certificationId",
  controller.update.bind(controller)
);

/**
 * @openapi
 * /freelancers/{id}/certifications/{certificationId}:
 *   delete:
 *     summary: Delete a certification of a freelancer
 *     tags:
 *       - Certification
 *     parameters:
 *       - in: path
 *         name: id
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
router.delete(
  "/:id/certifications/:certificationId",
  controller.delete.bind(controller)
);

export default router;

/**
 * @openapi
 * components:
 *   schemas:
 *     CertificationDTO:
 *       type: object
 *       properties:
 *         certification:
 *           type: string
 *           description: Name of the certification
 *           example: "AWS Certified Developer"
 *         id:
 *           type: string
 *           description: ID of the certification
 *           example: "cert-abc123"
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
 *         - id
 *         - institution
 *         - year
 */
