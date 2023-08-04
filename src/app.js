import express from "express"
import { Server } from "socket.io"
import viewsRouter from "./routes/views.router.js"
import handlebars from "express-handlebars"
import { __dirname } from "./utils.js"
import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"
import socket from "./socket.js"
import filesRouter from "./routes/files.router.js"
import mongoose from "mongoose"
import * as dotenv from "dotenv"

dotenv.config()
const app = express()
const port = process.env.PORT

// DATABASE CONECTION

const MONGO_URI = process.env.MONGO_URI
mongoose.connect(MONGO_URI).then(() => console.log("DB is connected")).catch((error) => {
    if (error) {
        console.log(error);
        process.exit()
    }
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

const httpServer = app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
})

const io = new Server(httpServer)
socket(io)
