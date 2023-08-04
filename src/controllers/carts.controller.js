import CartManager from "../manager/CartManager.js"

let miCarrito = new CartManager.CartManager("./carrito.json")

export const addCart = async (req, res) => {

    try {
        await miCarrito.addCart()
        res.json({ status: 200, mensaje: "CARRITO CREADO" })
    }
    catch (err) {
        res.status(err.statusCode).send(` ${err}`);
    }
}

export const getCart = async (req, res) => {
    const { cid } = req.params
    try {
        let carrito = await miCarrito.getCartsById(Number(cid))

        res.json({ status: 200, mensaje: `CARRITO N° ${cid}`, data: carrito.products })
    }
    catch (err) {
        res.status(err.statusCode).send(` ${err}`);
    }
}

export const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params

    try {
        await miCarrito.addProductToCart(Number(cid), Number(pid))
        let carrito = await miCarrito.getCartsById(Number(cid))
        res.json({ status: 200, mensaje: `Producto ID: ${pid} agregado al carrito n° ${cid}`, data: carrito.products })
    }
    catch (err) {
        res.status(err.statusCode).send(` ${err}`);
    }
}
