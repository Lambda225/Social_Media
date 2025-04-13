import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KET;

export default (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(401).json({ mgs: "you don't provide the token" });
  }
  const decodedToken = jwt.verify(authorizationHeader, secretKey);
  if (!decodedToken) {
    return res.status(401).json("You can't access this ressource");
  }
  const userId = decodedToken.userId;
  const paramsId = req.params.id;
  if (paramsId && paramsId != userId) {
    return res.status(401).json('The user Id is invalid');
  } else {
    next();
  }
};
