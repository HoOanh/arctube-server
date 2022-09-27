import { createError } from '../error.js';
import User from '../models/User.js';
import Video from '../models/Video.js';

export const update = async (req, res, next) => {
  if (req.params.id == req.user.id) {
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, 'You can update only your account!'));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id == req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('User has been delete!');
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, 'You can update only your account!'));
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
export const subscribe = async (req, res, next) => {
  try {
    // push id user sub to array subscribedUser
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUser: req.params.id },
    });

    // increase 1 to subscribes
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });

    res.status(200).json('Subscription successfull!');
  } catch (error) {
    next(error);
  }
};
export const unsubscribe = async (req, res, next) => {
  try {
    // pull id user sub to array subscribedUser
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUser: req.params.id },
    });

    // decrease 1 to subscribes
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });

    res.status(200).json('Unsubscription successfull!');
  } catch (error) {
    next(error);
  }
};
export const like = async (req, res, next) => {
  const id = req.user.id;
  try {
    await Video.findByIdAndUpdate(req.params.videoId, {
      $addToSet: { likes: id },
      $pull: { disLikes: id },
    });
    res.status(200).json('The video has been liked!');
  } catch (error) {
    next(error);
  }
};
export const dislike = async (req, res, next) => {
  const id = req.user.id;
  try {
    await Video.findByIdAndUpdate(req.params.videoId, {
      $addToSet: { disLikes: id },
      $pull: { likes: id },
    });
    res.status(200).json('The video has been dislike!');
  } catch (error) {
    next(error);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const user = await User.find({
      name: { $regex: query, $options: 'i' },
    }).limit(40);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
