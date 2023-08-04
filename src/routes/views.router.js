import { Router } from "express";
import { home, realtimeproducts, realtimeproductsDB, multer, chat } from "../controllers/views.controller.js";

const router = Router()

router.get("/home", home)

router.get("/realtimeproducts", realtimeproducts)

router.get("/realtimeproductsdb", realtimeproductsDB)

router.get("/chat", chat)

router.get("/multer", multer)


export default router