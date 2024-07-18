import { Router } from "express";
import { validate } from "../Middleware/usersMiddleware.js";
import { createuser, loginUser } from "../Controllers/usersController.js";
const router = Router();

router.post("/register", validate, createuser);

router.post("/login", loginUser);

export default router;