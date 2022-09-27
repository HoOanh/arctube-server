import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../error.js';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.send(200, 'User has been created!');
  } catch (err) {
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, 'User not found!'));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, 'Wrong Credentials!'));

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...other } = user._doc;
    res.status(200).json({ other: other, token: token });
  } catch (err) {
    next(err);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res.status(200).json({
        other: user._doc,
        token: token,
      });
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const saveUser = await newUser.save();

      const token = jwt.sign({ id: saveUser._id }, process.env.JWT);
      res.status(200).json({
        other: saveUser._doc,
        token: token,
      });
    }
  } catch (error) {
    next(error);
  }
};
