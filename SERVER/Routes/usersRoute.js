import { Router } from "express";
import validate from "../Middleware/usersMiddleware.js";
import VerifyAdmin from "../Middleware/VerifyAdmin.js";
import {
  getAllUsers,
  loginUser,
  createuser,
  deleteUser,
  getSingleuser,
  ToggleAdmin
} from "../Controllers/usersController.js";
const router = Router();

router.post("/register", createuser);
router.get("/users", VerifyAdmin, getAllUsers);
router.post("/login", loginUser);
router.delete("/delete/:id", VerifyAdmin, deleteUser);
router.get("/user/:id", VerifyAdmin, getSingleuser);
router.patch("/toggleAdmin/:id",ToggleAdmin)

export default router;
