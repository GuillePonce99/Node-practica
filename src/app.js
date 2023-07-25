import express from "express"
import { Server } from "socket.io"
import viewsRouter from "./routes/views.router.js"
import handlebars from "express-handlebars"
import { __dirname } from "./utils.js"
import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"
import socket from "./socket.js"
import filesRouter from "./routes/files.router.js"

const app = express()
const port = 8080

const httpServer = app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
})

//config


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use("/api/files", filesRouter)
app.use("/", viewsRouter)

//HANDLEBARS CONFIG

app.engine("handlebars", handlebars.engine())

app.set("views", __dirname + "/views")

app.set("view engine", "handlebars")

//Socket io

const io = new Server(httpServer)

socket(io)


