import express from 'express';
import { googleAuth, signIn, signUp } from '../controllers/controller__auth.js';

const router = express.Router();

// CREATE A USER
router.post('/sign-up', signUp);
// SIGN IN
router.post('/sign-in', signIn);

// GOOGLE AUTH
router.post('/google', googleAuth);

export default router;
