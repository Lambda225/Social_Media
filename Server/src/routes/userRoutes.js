import express from "express";
import middlewareAuth from "../help/middlewareAuth.js";
import {
  follow,
  getAllUser,
  getChatUser,
  putUserImage,
} from "../controllers/userController.js";
import { upload } from "../help/uploadFile.js";

const router = express.Router();

router.get("/all/:id", middlewareAuth, getAllUser);
router.get("/chat/:id/:chatId", getChatUser);
router.put("/:id/:followerId", middlewareAuth, follow);
router.put("/:id", upload.single("userImage"), putUserImage);

export default router;
