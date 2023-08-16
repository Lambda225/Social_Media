import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../db/sequelize.js';

dotenv.config();

const register = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const password = hash;
      return User.create({ ...req.body, password }).then((response) => {
        return res.status(201).json({ msg: 'User Created' });
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const login = (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      return bcrypt
        .compare(req.body.password, user.password)
        .then((isValide) => {
          if (!isValide) {
            return res.status(401).json({ msg: 'Password is not correct' });
          }
          const secretKey = process.env.SECRET_KET;
          const token = jwt.sign({ userId: user.id }, secretKey);
          return res.status(200).json({ user, token });
        });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

const getCurrentUser = (req, res) => {
  const paramsId = req.params.id;
  User.findOne({ where: { id: paramsId } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      } else {
        return res.status(200).json({ user });
      }
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

export { register, login, getCurrentUser };
