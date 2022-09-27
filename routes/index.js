import authRouter from './auth.js';
import userRouter from './users.js';
import videoRouter from './video.js';
import commentRouter from './comment.js';

const route = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/user', userRouter);
  app.use('/api/videos', videoRouter);
  app.use('/api/comments', commentRouter);
};

export default route;
