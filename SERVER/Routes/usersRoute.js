import { Router } from "express";
import validate from "../Middleware/usersMiddleware.js"
import {
  getAllUsers,
  loginUser,
  createuser,
  deleteUser
} from "../Controllers/usersController.js";
const router = Router();

router.post("/register", validate, createuser);
router.get("/users", getAllUsers);
router.post("/login", loginUser);
router.delete("/delete/:id",deleteUser)

export default router;
