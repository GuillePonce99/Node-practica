import ProductManager from "../manager/ProductManager.js";
import ProductModel from "../models/products.model.js";

let miProducto = new ProductManager.ProductManager("productos.json")

//CONTROLLERS FS

export const getProducts = async (req, res) => {
    const productos = await miProducto.getProducts()
    const { limit } = req.query
    const response = await productos.slice(0, limit)
    try {
        if (limit) {
            res.json(response)
        } else {
            res.json(productos)
        }
    }
    catch (err) {
        res.status(err.statusCode).send(` ${err}`);
    }
}


export const getProduct = async (req, res) => {
    const { pid } = req.params

    try {
        res.send(await miProducto.getProductsById(Number(pid)))
    }
    catch (err) {
        res.status(err.statusCode).send(` ${err}`);
    }
}

export const addProduct = async (req, res) => {
    const { id, title, description, code, price, status, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(401).json({ message: "Faltan datos" });
    }
    if (!thumbnails) {
        req.body.thumbnail = "";
    }
    if (status === undefined) {
        req.body.status = true
    }
    if (id) {
        return res.status(401).json({ message: "No incluir ID" });
    }

    req.body.code = req.body.code.toString()
    try {
        await miProducto.addProduct(req.body)
        res.json({ status: 200, mensaje: "PRODUCTO CARGADO EXITOSAMENTE", data: req.body })
    }
    catch (err) {
        res.status(err.statusCode).send(` ${err}`);
    }
}

export const updateProduct = async (req, res) => {
    const { pid } = req.params
    if (req.body.code) {
        req.body.code = req.body.code.toString()
    }

    try {
        await miProducto.updateProduct(Number(pid), req.body),
            res.json({ status: 200, mensaje: "PRODUCTO ACTUALIZADO CORRECTAMENTE", data: req.body })
    }
    catch (err) {
        res.status(err.statusCode).send(` ${err}`);
    }
}

export const deleteProduct = async (req, res) => {
    const { pid } = req.params

    try {
        await miProducto.deleteProduct(Number(pid)),
            res.json({ status: 200, mensaje: "PRODUCTO ELIMINADO" })
    }
    catch (err) {
        res.status(err.statusCode).send(` ${err}`);
    }
}

//CONTROLLERS DB


export const getProductsDB = async (req, res) => {
    try {
        const result = await ProductModel.find();
        res.send({ message: result.length ? "Lista de usuario" : "No hay usuario", data: result })
    }
    catch (error) {
        res.status(500).json({
            message: "error",
            error: error
        })
    }

}

export const getProductDB = async (req, res) => {
    const { pid } = req.params

    try {
        const exist = await ProductModel.findOne({ "code": pid })
        if (exist === null) {
            return res.status(404).json({ message: "Not Found" });
        }
        const result = await ProductModel.findOne({ "code": pid });
        res.json({ message: "success", data: result })
    }
    catch (error) {
        res.status(500).json({
            message: "error",
            error: error
        })
    }

}

export const addProductDB = async (req, res) => {
    const { id, title, description, code, price, status, stock, category, thumbnails } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(401).json({ message: "Faltan datos" });
    }
    if (!thumbnails) {
        req.body.thumbnail = "";
    }
    if (status === undefined) {
        req.body.status = true
    }
    if (id) {
        return res.status(401).json({ message: "No incluir ID" });
    }

    const repetedCode = await ProductModel.findOne({ "code": req.body.code })

    if (repetedCode) {
        return res.status(404).json({ message: `Ya existe el producto con el CODE: ${req.body.code}` });
    }

    try {

        const product = {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        }
        const result = await ProductModel.create(product)
        res.json({ message: "OK", data: result })
    }
    catch (error) {
        res.status(500).json({
            message: "error",
            error: error
        })
    }
}

export const deleteProductDB = async (req, res) => {
    const { pid } = req.params

    try {
        const exist = await ProductModel.findOne({ "code": pid })
        console.log(exist);

        if (exist === null) {
            return res.status(404).json({ message: "Not Found" });
        }
        const result = await ProductModel.findOneAndDelete({ "code": pid })
        res.json({ message: "success", data: result })
    }
    catch (error) {
        res.status(500).json({
            message: "error",
            error: error
        })
    }
}

export const updateProductDB = async (req, res) => {
    const { pid } = req.params

    if (req.body.code) {
        req.body.code = req.body.code.toString()
    }
    try {
        const exist = await ProductModel.findOne({ "code": pid })
        if (!exist) {
            return res.status(404).json({ message: "Not Found" });
        }

        const repetedCode = await ProductModel.findOne({ "code": req.body.code })

        if (repetedCode) {
            return res.status(404).json({ message: `Ya existe el producto con el CODE: ${req.body.code}` });
        }

        await ProductModel.findOneAndUpdate({ "code": pid }, req.body)
        res.json({ status: 200, mensaje: "PRODUCTO ACTUALIZADO CORRECTAMENTE", data: req.body })


    }
    catch (error) {
        res.status(500).json({
            message: "error",
            error: error
        })
    }
}