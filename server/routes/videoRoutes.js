<<<<<<< Updated upstream
import express from 'express';
import {
  postVideo,
  getVideos,
  deleteVideo,
} from '../controllers/videoController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getVideos)
  .post(protect, admin, postVideo);

router.route('/:id')
  .delete(protect, admin, deleteVideo);

export default router;
=======
const express = require('express');
const router = express.Router();
const { getVideos, addVideo } = require('../controllers/videoController');

router.get('/', getVideos);  
router.post('/', addVideo);  

module.exports = router;
>>>>>>> Stashed changes
