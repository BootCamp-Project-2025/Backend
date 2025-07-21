import { Router } from "express";
import { container } from "@/di-container";
import { RequestController } from "../controllers/RequestController";

export const requestRoutes = Router({ mergeParams: true });
const controller = container.resolve(RequestController);

requestRoutes.get("/validUserRequests", controller.getUserActiveRequest);
requestRoutes.post("/", controller.create);
requestRoutes.delete("/:requestId", controller.delete);
