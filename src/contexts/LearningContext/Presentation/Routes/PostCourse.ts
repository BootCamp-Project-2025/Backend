import express from "express";
import { CourseController } from "../controllers/CourseController";
import { CreateCourseService } from "../../application/services/CreateCourseService";
import { CourseRepository } from "../../infraestructure/repository/CourseRepository";

const couseRouter = express.Router();

const repo = new CourseRepository();
const service = new CreateCourseService(repo);
const controller = new CourseController(service);

couseRouter.post("/courses", async (req, res, next) => {
  try {
    await controller.create(req, res);
  } catch (err) {
    next(err);
  }
});

export { couseRouter };
