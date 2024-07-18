import { Router } from "express";
import validate from "../Middleware/usersMiddleware.js"
import {
  getAllUsers,
  loginUser,
  createuser,
  deleteUser,
  getSingleuser
} from "../Controllers/usersController.js";
const router = Router();

router.post("/register", validate, createuser);
router.get("/users", getAllUsers);
router.post("/login", loginUser);
router.delete("/delete/:id",deleteUser)
router.get("/user/:id",getSingleuser)




export default router;
