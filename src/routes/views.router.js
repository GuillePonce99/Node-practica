import { Router } from "express";
import { ProductManager } from "../manager/ProductManager.js";


const miProducto = new ProductManager("productos.json")
const router = Router()

router.get("/home", async (req, res) => {
    const productos = await miProducto.getProducts()
    res.render("home", { productos, style: "styles.css", title: "PRODUCTOS" })
})

router.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts", { style: "styles.css", title: "PRODUCTOS-REAL-TIME" })
})

router.get("/chat", async (req, res) => {
    res.render("chat", { style: "chat.css", title: "CHAT" })
})

router.get("/multer", (req, res) => {
    res.render("multer", { style: "styles.css" })
})


export default router