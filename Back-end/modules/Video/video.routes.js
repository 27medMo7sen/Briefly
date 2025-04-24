import { Router } from "express";
import multer from "multer";
import { isAuth } from "../../middleware/isAuth.js";
import { uploadVideo, getVideoStatus, getVideos } from "./video.controller.js";
import { customAlphabet } from "nanoid";
import { asyncHandler } from "../../utils/errorHandling.js";
import path from "path";
import os from "os";

const router = Router();
const nanoid = customAlphabet("1234567890abcdef", 10);

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Use system's temp directory for initial upload
    cb(null, os.tmpdir());
  },
  filename: (req, file, cb) => {
    const fileName = nanoid() + "." + file.originalname.split(".").pop();
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 * 1024, // 5GB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only video files are allowed!"), false);
    }
  },
});

// Routes
router.post("/upload", isAuth, upload.single("video"), asyncHandler(uploadVideo));
router.get("/status/:id", isAuth, asyncHandler(getVideoStatus));
router.get("/retrieve", isAuth, asyncHandler(getVideos));

export default router;
