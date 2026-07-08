<<<<<<< Updated upstream
import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

export default router;
=======
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register); 
router.post('/login', login);       

module.exports = router;
>>>>>>> Stashed changes
