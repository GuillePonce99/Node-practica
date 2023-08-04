import { Router } from "express";
import uploader from "../middleware/uploader.middleware.js";
import { multerConfig } from "../controllers/files.controller.js";

const router = Router()

router.post("/", uploader, multerConfig)

export default router