<<<<<<< Updated upstream
import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a video title'],
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'Please add a YouTube video URL'],
      trim: true,
      match: [
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
        'Please add a valid YouTube URL',
      ],
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model('Video', videoSchema);

export default Video;
=======
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Video title is required'] 
    },
    youtubeUrl: { 
        type: String, 
        required: [true, 'YouTube URL is required'] 
    },
    category: { 
        type: String, 
        default: 'General' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
>>>>>>> Stashed changes
