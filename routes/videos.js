const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const { getYoutubeData } = require('../utils/youtube');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// @route   GET /api/videos
// @desc    Get all videos with optional sorting (Public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { sort } = req.query;
    let sortBy = { createdAt: -1 }; // Default: newest first

    if (sort === 'oldest') {
      sortBy = { createdAt: 1 };
    } else if (sort === 'title-asc') {
      sortBy = { title: 1 };
    } else if (sort === 'title-desc') {
      sortBy = { title: -1 };
    }

    const videos = await Video.find({}).sort(sortBy);
    res.json({ success: true, count: videos.length, data: videos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/videos
// @desc    Create a new video (Admin Only)
// @access  Private/Admin
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  const { title, youtubeUrl } = req.body;

  if (!title || !youtubeUrl) {
    return res.status(400).json({ success: false, message: 'Please provide both title and youtubeUrl' });
  }

  try {
    // Extract youtube metadata (id, thumbnail)
    const ytData = getYoutubeData(youtubeUrl);
    if (!ytData) {
      return res.status(400).json({ success: false, message: 'Invalid YouTube URL format' });
    }

    const video = await Video.create({
      title,
      youtubeUrl,
      youtubeId: ytData.videoId,
      thumbnailUrl: ytData.thumbnailUrl,
    });

    res.status(201).json({ success: true, data: video });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/videos/:id
// @desc    Delete a video (Admin Only)
// @access  Private/Admin
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    await video.deleteOne();
    res.json({ success: true, message: 'Video removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
