import User from '../models/User.js';
import Video from '../models/Video.js';
import { createError } from '../error.js';

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (error) {
    next(error);
  }
};
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, 'Video not found!'));
    if (req.user.id === video.userId) {
      const updateVideo = await Video.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateVideo);
    } else {
      next(createError(403, 'You can update only your video!'));
    }
  } catch (error) {
    next(error);
  }
};
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, 'Video not found!'));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json('The video has been deleted!');
    } else {
      next(createError(403, 'You can delete only your video!'));
    }
  } catch (error) {
    next(error);
  }
};
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};
export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json('The views has been increased!');
  } catch (error) {
    next(error);
  }
};
export const trend = async (req, res, next) => {
  try {
    const video = await Video.find().sort({ views: -1 });
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};
export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 30 } }]);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribeChannels = user.subscribedUser;

    const list = await Promise.all(
      subscribeChannels.map((channelId) => Video.find({ userId: channelId }))
    );

    res
      .status(200)
      .json(
        list.flat().sort((fist, second) => second.createAt - fist.createAt)
      );
  } catch (error) {
    next(error);
  }
};

export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(',');
  try {
    const video = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const video = await Video.find({
      title: { $regex: query, $options: 'i' },
    }).limit(40);
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};
