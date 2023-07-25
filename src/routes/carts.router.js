import { Router } from "express";
import express from "express"
import CartManager from "../manager/CartManager.js";
import ProductManager from "../manager/ProductManager.js";

const router = Router()
let miProducto = new ProductManager.ProductManager("./productos.json")
let miCarrito = new CartManager.CartManager("./carrito.json")

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res) => {

    try {
        await miCarrito.addCart()
        res.json({status: 200, mensaje: "CARRITO CREADO"})
    }
    catch (err) {
        res.status(err.statusCode).send(` ${err}`);
    }
})

router.get("/:cid",async (req,res)=>{
    const {cid} = req.params
    try {
        let carrito = await miCarrito.getCartsById(Number(cid))
        
        res.json({status: 200, mensaje: `CARRITO N° ${cid}`, data : carrito.products })
    }
    catch (err){
        res.status(err.statusCode).send(` ${err}`);
    }
})

router.get("/",async (req,res)=>{
    try {  
        res.json({status: 400, mensaje: "INGRESE UN ID CORRESPONDIENTE A UN CARRITO" })
    }
    catch (err){
        res.status(err.statusCode).send(` ${err}`);
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    const {cid , pid} = req.params
    
    try {
        await miCarrito.addProductToCart(Number(cid),Number(pid))
        let carrito = await miCarrito.getCartsById(Number(cid))
        res.json({status: 200, mensaje: `Producto ID: ${pid} agregado al carrito n° ${cid}`, data : carrito.products })
    }
    catch (err) {
        res.status(err.statusCode).send(` ${err}`);
    }
})



export default router