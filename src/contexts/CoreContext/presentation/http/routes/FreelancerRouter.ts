import express from "express";
import { UpdateAboutMeController } from "../controllers/UpdateAboutMeController";

const freelancerRouter = express.Router();

freelancerRouter.post("/about", (req, res) => {
  UpdateAboutMeController.execute(req, res);
});

export { freelancerRouter };
