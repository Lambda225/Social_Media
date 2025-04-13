import express from "express";
import { login, register, getCurrentUser } from "../controllers/auth.js";
import middlewareAuth from "../help/middlewareAuth.js";

const router = express.Router();

router.post("/", register);
router.get("/user/:id", getCurrentUser);
router.post("/login", login);

export default router;
