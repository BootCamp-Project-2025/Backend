import { Router } from "express";
import { ExperienceRoutes } from "./ExperienceRoutes";
import { EducationRoutes } from "./EducationRoutes";
import { LanguageRoutes } from "./LanguageRoute";
import { SkillRoutes } from "./SkillRoutes";
import { CertificationRoutes } from "./CertificationRoutes";
import { container } from "tsyringe";
import FreelancerController from "../controllers/FreelancerController";

const router = Router();
const controller = container.resolve(FreelancerController);

/**
 * @openapi
 *
 * /freelancers:
 *  get:
 *      summary: Get all freelancers
 *      tags:
 *       - Freelancers
 *      responses:
 *          200:
 *              description: Everything is ok and returns all Freelancers
 *          500:
 *              description: Everything is wrong
 *
 */
router.get("/", controller.getAll);

router.use("/:freelancerId/certifications", CertificationRoutes);
router.use("/:freelancerId/experiences", ExperienceRoutes);
router.use("/:freelancerId/educations", EducationRoutes);
router.use("/:freelancerId/languages", LanguageRoutes);
router.use("/:freelancerId/skills", SkillRoutes);

export default router;
