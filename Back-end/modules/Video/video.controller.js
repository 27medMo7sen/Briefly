import { Video } from "./video.model.js";

export const uploadVideo = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new Error("No video file uploaded", { cause: 400 }));
    }

    console.log("Uploading video");
    const video = new Video({
      title: req.body.title || req.file.originalname,
      description: req.body.description,
      filePath: req.file.path,
      owner: req.user._id,
      status: 'completed' // Set status to completed since we're not processing
    });

    await video.save();
    console.log("Video saved");

    return res.status(201).json({
      message: "Video uploaded successfully",
      video: {
        id: video._id,
        title: video.title,
        status: video.status,
        filePath: video.filePath
      },
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
      metadata: video.metadata,
    });
  } catch (error) {
    return next(new Error(error.message, { cause: error.cause || 500 }));
  }
};
