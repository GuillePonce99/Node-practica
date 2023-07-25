import { ProductManager } from "./manager/ProductManager.js"
const miProducto = new ProductManager("productos.json")

export default (io) => {
    let messages = []
    io.on("connection", async (socket) => {
        console.log("nueva conexion");
        const productos = await miProducto.getProducts()
        socket.emit("lista_productos", productos)
        socket.on("agregar_producto", async (data) => {
            const { title, description, code, price, status, stock, category, thumbnails } = data;
            let isComplete = true
            let isDuplicate = false
            if (!title || !description || !code || !price || !stock || !category) {
                return (isComplete = false, socket.emit("agregar_producto", { isComplete, isDuplicate }))

            } else {
                if (!thumbnails) {
                    data.thumbnail = "";
                }
                if (status === undefined) {
                    data.status = true
                }

                data.code = data.code.toString()
                try {
                    await miProducto.addProduct(data).then((result) => {
                        if (result === false) {
                            isDuplicate = true
                            socket.emit("agregar_producto", { isComplete, isDuplicate })
                        } else {
                            socket.emit("agregar_producto", { isComplete, isDuplicate })
                        }
                    })
                }
                catch (err) {
                    console.log(err);
                }

            }

        })

        socket.on("eliminar_producto", async (data) => {
            let notFound = false
            try {
                await miProducto.deleteProduct(data.id).then((result) => {
                    if (result === false) {
                        notFound = true
                        socket.emit("eliminar_producto", { notFound })
                    } else {
                        socket.emit("eliminar_producto", { notFound })
                    }
                })
            }
            catch (e) {
                console.log(e);
            }
        })

        // CHAT //
        socket.on("new-user", (data) => {
            socket.user = data.user
            socket.id = data.id
            socket.emit("user-dom", socket.user)
        })

        socket.on("message", (data) => {
            messages.push(data)
            io.emit("message_logs", messages)
        })

    })
}