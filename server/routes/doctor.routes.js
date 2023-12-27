import { Router } from "express";
import { registerDoctor } from "../controllers/doctor.controller.js";

const docRouter = Router();

docRouter.route("/createdoctor").post(registerDoctor)
export {docRouter};