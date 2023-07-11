import express from "express";
import { auth } from "../middleware/auth";
import * as meController from "../controllers/me.controller";

const meRouter = express.Router();

meRouter.get("/", meController.getMe);
meRouter.post("/", meController.createMe);

export default meRouter;
