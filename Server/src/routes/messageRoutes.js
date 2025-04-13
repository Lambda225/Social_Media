import express from "express";
import middlewareAuth from "../help/middlewareAuth.js";
import {
  createMessage,
  getChatMessage,
} from "../controllers/messageController.js";

const routes = express.Router();

routes.post("/:id/:chatId", middlewareAuth, createMessage);
routes.get("/:id/:chatId", middlewareAuth, getChatMessage);

export default routes;
