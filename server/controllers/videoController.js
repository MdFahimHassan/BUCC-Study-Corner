import Video from '../models/Video.js';
import {
  createMemoryVideo,
  deleteMemoryVideo,
  findMemoryVideoById,
  isMemoryStoreEnabled,
  listMemoryVideos,
  updateMemoryVideo,
} from '../config/storage.js';

// @desc    Post a new video
// @route   POST /api/videos
// @access  Private/Admin
export const postVideo = async (req, res) => {
  const { title, youtubeId, category, tags } = req.body;

  if (!title || !youtubeId) {
    return res.status(400).json({ message: 'Please provide both title and YouTube video ID' });
  }

  try {
    if (isMemoryStoreEnabled()) {
      const video = await createMemoryVideo({
        title,
        youtubeId,
        category: category || 'General',
        tags: tags || [],
        postedBy: req.user._id,
      });
      return res.status(201).json(video);
    }

    const video = await Video.create({
      title,
      youtubeId,
      category: category || 'General',
      tags: tags || [],
      postedBy: req.user._id,
    });

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
export const getVideos = async (req, res) => {
  try {
    if (isMemoryStoreEnabled()) {
      const videos = await listMemoryVideos();
      return res.json(videos);
    }

    const videos = await Video.find({})
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

// @desc    Update an existing video
// @route   PUT /api/videos/:id
// @access  Private/Admin
export const updateVideo = async (req, res) => {
  const { title, youtubeId, category, tags } = req.body;

  try {
    if (isMemoryStoreEnabled()) {
      const updatedVideo = await updateMemoryVideo(req.params.id, {
        title: title || undefined,
        youtubeId: youtubeId || undefined,
        category: category || undefined,
        tags: tags !== undefined ? tags : undefined,
      });

      if (!updatedVideo) {
        return res.status(404).json({ message: 'Video not found' });
      }

      return res.json(updatedVideo);
    }

    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    video.title = title || video.title;
    video.youtubeId = youtubeId || video.youtubeId;
    video.category = category || video.category;
    if (tags !== undefined) {
      video.tags = tags;
    }

    const updatedVideo = await video.save();
    res.json(updatedVideo);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

// @desc    Delete a video
// @route   DELETE /api/videos/:id
// @access  Private/Admin
export const deleteVideo = async (req, res) => {
  try {
    if (isMemoryStoreEnabled()) {
      const removed = await deleteMemoryVideo(req.params.id);
      if (!removed) {
        return res.status(404).json({ message: 'Video not found' });
      }
      return res.json({ message: 'Video removed successfully' });
    }

    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    await video.deleteOne();
    res.json({ message: 'Video removed successfully' });
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};
