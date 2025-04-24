import { Video } from "./video.model.js";
import fs from "fs";
import path, { join } from "path";
import { uploadToCloudinary } from "../../utils/cloudinary.js";

export const uploadVideo = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new Error("No video file uploaded", { cause: 400 }));
    }

    console.log("Starting video upload process");
    const __dirname = decodeURIComponent(
      path
        .dirname(new URL(import.meta.url).pathname)
        .replace(/^\/([a-zA-Z]:)/, "$1")
    );

    // Create user's storage directory if it doesn't exist
    const userStoragePath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "storage",
      req.user._id.toString()
    );

    // Create original and summarized directories
    await fs.promises.mkdir(path.join(userStoragePath, "original"), { recursive: true });
    await fs.promises.mkdir(path.join(userStoragePath, "summarized"), { recursive: true });

    const filePath = path.join(userStoragePath, "original", req.file.filename);

    // First, copy the file to the local storage
    await fs.promises.copyFile(req.file.path, filePath);
    console.log("File copied to local storage");

    // Then upload to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(
      filePath,
      `videos/${req.user._id}/original`
    );
    console.log("File uploaded to Cloudinary");

    // Clean up the temporary file
    await fs.promises.unlink(req.file.path);
    console.log("Temporary file cleaned up");

    const video = new Video({
      title: req.body.title || req.file.originalname,
      description: req.body.description,
      filePath,
      customId: req.file.filename,
      owner: req.user._id,
      status: "completed",
      secureUrl: cloudinaryResult.secure_url,
      publicId: cloudinaryResult.public_id
    });

    await video.save();
    console.log("Video saved to database");

    return res.status(201).json({
      message: "Video uploaded successfully",
      video: {
        id: video._id,
        title: video.title,
        status: video.status,
        filePath: video.filePath,
        secureUrl: video.secureUrl
      },
    });
  } catch (error) {
    console.error("Error in uploadVideo:", error);
    // Clean up any temporary files in case of error
    if (req.file && req.file.path) {
      try {
        await fs.promises.unlink(req.file.path);
      } catch (cleanupError) {
        console.error("Error cleaning up temporary file:", cleanupError);
      }
    }
    return next(new Error(error.message, { cause: error.cause || 500 }));
  }
};

export const getVideos = async (req, res, next) => {
  try {
    const videos = await Video.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });
    
    if (!videos || videos.length === 0) {
      return next(new Error("No videos found", { cause: 404 }));
    }

    return res.status(200).json({
      message: "Videos fetched successfully",
      videos: videos.map((video) => ({
        id: video._id,
        title: video.title,
        status: video.status,
        filePath: video.filePath,
        secureUrl: video.secureUrl,
        customId: video.customId,
        time_stamp: video.createdAt,
      })),
    });
  } catch (error) {
    return next(new Error(error.message, { cause: error.cause || 500 }));
  }
};

export const getVideoStatus = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return next(new Error("Video not found", { cause: 404 }));
    }

    return res.json({
      status: video.status,
      filePath: video.filePath,
      secureUrl: video.secureUrl,
      metadata: video.metadata,
    });
  } catch (error) {
    return next(new Error(error.message, { cause: error.cause || 500 }));
  }
};
