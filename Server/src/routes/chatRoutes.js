import express from "express";
import middlewareAuth from "../help/middlewareAuth.js";
import { createChat, getUserChat } from "../controllers/chatController.js";

const routes = express.Router();

routes.get("/:id", middlewareAuth, getUserChat);
routes.post("/:id/:userId", middlewareAuth, createChat);

export default routes;
