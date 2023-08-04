import { Router } from "express";
import { updateProductDB, getProductDB, getProductsDB, deleteProductDB, addProductDB, getProducts, getProduct, addProduct, deleteProduct, updateProduct } from "../controllers/product.controller.js";


const router = Router()

// ROUTERS DB

router.get("/db/", getProductsDB)
router.get("/db/:pid", getProductDB)
router.post("/db/", addProductDB)
router.delete("/db/:pid", deleteProductDB)
router.put("/db/:pid", updateProductDB)


// ROUTERS FS

router.get("/", getProducts)
router.get("/:pid", getProduct)
router.post("/", addProduct)
router.put("/:pid", updateProduct)
router.delete("/:pid", deleteProduct)


// en caso que no se ingrese un ID en los parametros// FS

router.put("/", (req, res) => {
    res.json({ status: 400, mensaje: "INGRESE EL ID DEL PRODUCTO A MODIFICAR" })
})
router.delete("/", (req, res) => {
    res.json({ status: 400, mensaje: "INGRESE EL ID DEL PRODUCTO A ELIMINAR " })
})

// en caso que no se ingrese un ID en los parametros// DB
router.put("/db/", (req, res) => {
    res.json({ status: 400, mensaje: "INGRESE EL ID DEL PRODUCTO A MODIFICAR" })
})
router.delete("/db/", (req, res) => {
    res.json({ status: 400, mensaje: "INGRESE EL ID DEL PRODUCTO A ELIMINAR " })
})




export default router