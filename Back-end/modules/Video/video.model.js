import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  filePath: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['completed'],
    default: 'completed'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export const Video = mongoose.model('Video', videoSchema); 