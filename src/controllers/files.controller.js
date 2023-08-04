export const multerConfig = (req, res) => {
    const hora = Date().toString()
    const tamaño = Number.parseFloat(req.file.size / 1000000).toFixed(2) + " MB";
    const data = { Nombre: req.file.originalname, Tamaño: tamaño, Hora: hora }
    res.json({ mensaje: "archivo subido", data })
}