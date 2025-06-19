import { Router } from "express";
import { container } from "@/di-container";
import { CertificationController } from "../controllers/CertificationController";

const router = Router();
const controller = container.resolve(CertificationController);

/**
 * @openapi
 * /freelancer/{id}/certifications:
 *   get:
 *     summary: Retrieve certifications by freelancer ID
 *     tags:
 *       - Certifications
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
 * /freelancer/{id}/certifications:
 *   post:
 *     summary: Create a new certification for a freelancer
 *     tags:
 *       - Certifications
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
 * /freelancer/{id}/certifications/{certificationId}:
 *   put:
 *     summary: Update a certification for a freelancer
 *     tags:
 *       - Certifications
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
 * /freelancer/{id}/certifications/{certificationId}:
 *   delete:
 *     summary: Delete a certification for a freelancer
 *     tags:
 *       - Certifications
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
