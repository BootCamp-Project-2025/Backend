import express from "express";
import { CourseController } from "../controllers/CourseController";
import { CreateCourseUseCase } from "../../application/useCases/CreateCourseUseCase";
import { CourseRepository } from "../../infraestructure/database/CourseRepository";

const couseRouter = express.Router();

const repo = new CourseRepository();
const service = new CreateCourseUseCase(repo);
const controller = new CourseController(service);

couseRouter.post("/courses", async (req, res, next) => {
  try {
    await controller.create(req, res);
  } catch (err) {
    next(err);
  }
});

export { couseRouter };
