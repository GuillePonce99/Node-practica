import { ProductManager } from "../manager/ProductManager.js"

const miProducto = new ProductManager("productos.json")

export const home = async (req, res) => {
    const productos = await miProducto.getProducts()
    res.render("home", { productos, style: "styles.css", title: "PRODUCTOS" })
}

export const realtimeproducts = async (req, res) => {
    res.render("realTimeProducts", { style: "styles.css", title: "PRODUCTOS-REAL-TIME" })
}

export const chat = async (req, res) => {
    res.render("chat", { style: "chat.css", title: "CHAT" })
}

export const multer = (req, res) => {
    res.render("multer", { style: "styles.css" })
}

export const realtimeproductsDB = async (req, res) => {
    res.render("realTimeProductsDB", { style: "styles.css", title: "PRODUCTOS-REAL-TIME-DB" })
}