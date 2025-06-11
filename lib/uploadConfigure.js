import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathName = path.join(process.cwd(), "public", "products");
    cb(null, pathName);
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

export default upload;
