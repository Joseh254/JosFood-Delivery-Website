import { Router } from "express";
import {
  getAllUsers,
  loginUser,
  createuser,
} from "../Controllers/usersController.js";
const router = Router();

router.post("/register", createuser);
router.get("/users", getAllUsers);

router.post("/login", loginUser);

export default router;
