import express from "express";
import { CourseController } from "../Controllers/CourseController";
import { CreateCourseService } from "../../Application/Services/CreateCourseService";
import { CourseRepository } from "../../Infraestructure/Repository/CourseRepository";

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
