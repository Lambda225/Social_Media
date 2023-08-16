import express from "express";
import middlewareAuth from "../help/middlewareAuth.js";
import {
  follow,
  getAllUser,
  getChatUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/all/:id", middlewareAuth, getAllUser);
router.get("/chat/:id/:chatId", getChatUser);
router.put("/:id/:followerId", middlewareAuth, follow);

export default router;
