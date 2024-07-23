import { Router } from "express";
import { createCart, removeCart,getCart } from "../Controllers/cartContoller.js";
import VerifyCart from "../Middleware/verifyCartUser";
const router = Router();
router.post("/createCart", createCart);
router.get("/getCart/:id", VerifyCart, getCart)
router.delete("/removeCart/:id", VerifyCart, removeCart);

export default router;
