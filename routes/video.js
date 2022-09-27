import express from 'express';
import {
  addVideo,
  addView,
  deleteVideo,
  getByTag,
  getVideo,
  random,
  search,
  sub,
  trend,
  updateVideo,
} from '../controllers/controller__video.js';
import { verifyToken } from '../verifyToken.js';
const router = express.Router();

// create a video
router.post('/', verifyToken, addVideo);

// update a video
router.put('/:id', verifyToken, updateVideo);

// delete a video
router.post('/:id', verifyToken, deleteVideo);

// get video
router.get('/find/:id', getVideo);

// update views
router.put('/view/:id', addView);

// return video trending
router.get('/trend', trend);

// return video random
router.get('/random', random);

// return video subscribe
router.get('/sub', verifyToken, sub);

// return video subscribe
router.get('/tags', getByTag);

// return video subscribe
router.get('/search', search);

export default router;
