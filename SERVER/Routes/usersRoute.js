import { Router } from "express";
import {getallusers, loginUser,createuser } from "../Controllers/usersController.js";
const router = Router();

router.post("register",createuser);
router.get("/users",getallusers)

router.post("/login", loginUser);

export default router;