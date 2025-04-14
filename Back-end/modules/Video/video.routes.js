import { Router } from "express";
import multer from "multer";
import { isAuth } from "../../middleware/isAuth.js";
import { uploadVideo, getVideoStatus } from "./video.controller.js";
import { customAlphabet } from "nanoid";
const router = Router();
const nanoid = customAlphabet("1234567890abcdef", 10);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `../storage/${req.user._id}/original`);
  },
  filename: (req, file, cb) => {
    const fileName = nanoid() + "." + file.originalname.split(".").pop();
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only video files are allowed!"), false);
    }
  },
});

router.post("/upload", isAuth, upload.single("video"), uploadVideo);
router.get("/status/:id", isAuth, getVideoStatus);

export default router;
