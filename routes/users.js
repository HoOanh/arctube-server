import express from 'express';
import {
  deleteUser,
  dislike,
  getUser,
  like,
  search,
  subscribe,
  unsubscribe,
  update,
} from '../controllers/controller__user.js';
import { verifyToken } from '../verifyToken.js';
const router = express.Router();

// update user
router.put('/:id', verifyToken, update);

// delete  user
router.delete('/:id', verifyToken, deleteUser);

// get a user
router.get('/find/:id', getUser);

// subscribe a user
router.put('/sub/:id', verifyToken, subscribe);

// unsubscribe a user
router.put('/un-sub/:id', verifyToken, unsubscribe);

// like a video
router.put('/like/:videoId', verifyToken, like);

// dislike a video
router.put('/dislike/:videoId', verifyToken, dislike);

// search
router.get('/search', search);

export default router;
