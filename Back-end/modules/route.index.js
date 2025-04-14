import userRoutes from './User/user.routes.js';
import videoRoutes from './Video/video.routes.js';

export const setupRoutes = (app) => {
  app.use('/api/users', userRoutes);
  app.use('/api/videos', videoRoutes);
};