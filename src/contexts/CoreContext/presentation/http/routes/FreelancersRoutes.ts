import { Router } from "express";
import { ExperienceRoutes } from "./ExperienceRoutes";
import { EducationRoutes } from "./EducationRoutes";
import { LanguageRoutes } from "./LanguageRoute";
import { SkillRoutes } from "./SkillRoutes";

const router = Router();

router.use("/:freelancerId/experiences", ExperienceRoutes);
router.use("/:freelancerId/educations", EducationRoutes);
router.use("/:freelancerId/languages", LanguageRoutes);
router.use("/:freelancerId/skills", SkillRoutes);

export default router;
