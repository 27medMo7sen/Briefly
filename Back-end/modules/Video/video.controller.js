import { Video } from "./video.model.js";
import fs from "fs";
import path, { join } from "path";
export const uploadVideo = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new Error("No video file uploaded", { cause: 400 }));
    }
    console.log("here22");
    console.log("Uploading video");
    const __dirname = decodeURIComponent(
      path
        .dirname(new URL(import.meta.url).pathname)
        .replace(/^\/([a-zA-Z]:)/, "$1")
    );
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "storage",
      req.user._id.toString()
    );
    const video = new Video({
      title: req.body.title || req.file.originalname,
      description: req.body.description,
      filePath,
      customId: req.file.filename,
      owner: req.user._id,
      status: "completed",
    });

    // let oldPath = join(__dirname, "..", "..", "..", "summarized.mp4");
    // let newPath = join(
    //   __dirname,
    //   "..",
    //   "..",
    //   "..",
    //   "storage",
    //   req.user._id.toString(),
    //   "summarized",
    //   req.file.filename
    // );

    // try {
    //   await fs.promises.copyFile(oldPath, newPath);
    // } catch (err) {
    //   console.error("Failed to move file:", err);
    //   return next(new Error("Failed to move file", { cause: 500 }));
    // }
    // console.log("File moved and renamed successfully!");

    await video.save();
    console.log("Video saved");

    return res.status(201).json({
      message: "Video uploaded successfully",
      video: {
        id: video._id,
        title: video.title,
        status: video.status,
        filePath: video.filePath,
      },
    });
  } catch (error) {
    return next(new Error(error.message, { cause: error.cause || 500 }));
  }
};
export const getVideos = async (req, res, next) => {
  const videos = await Video.find({ owner: req.user._id }).sort({
    createdAt: -1,
  });
  if (!videos) {
    return next(new Error("No videos found", { cause: 400 }));
  }
  console.log("Videos fetched successfully", videos);
  return res.status(200).json({
    message: "Videos fetched successfully",
    videos: videos.map((video) => ({
      id: video._id,
      title: video.title,
      status: video.status,
      filePath: video.filePath,
      customId: video.customId,
      time_stamp: video.createdAt,
    })),
  });
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
      metadata: video.metadata,
    });
  } catch (error) {
    return next(new Error(error.message, { cause: error.cause || 500 }));
  }
};
