import { Router } from "express";
import express from "express"
import { addCart, getCart, addProductToCart } from "../controllers/carts.controller.js";

const router = Router()

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.post("/", addCart)
router.get("/:cid", getCart)
router.post("/:cid/product/:pid", addProductToCart)

// en caso que no se ingrese un ID en los parametros//

router.get("/", async (req, res) => {
    try {
        res.json({ status: 400, mensaje: "INGRESE UN ID CORRESPONDIENTE A UN CARRITO" })
    }
    catch (err) {
        res.status(err.statusCode).send(` ${err}`);
    }
})

export default router