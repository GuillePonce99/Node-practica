import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination: "public/images",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const uploader = multer({ storage }).single('imagen');

export default uploader
