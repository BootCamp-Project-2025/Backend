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
 *         schema:
 *           type: string
 *         description: The ID of the freelancer
 *     responses:
 *       200:
 *         description: A list of certifications for the freelancer
 */
router.get(
  "/:id/certifications",
  controller.getByFreelancerId.bind(controller)
);

export default router;
