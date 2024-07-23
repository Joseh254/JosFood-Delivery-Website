import { Router } from "express";
import { createCart, removeCart,getCart } from "../Controllers/cartContoller.js";
const router = Router();
router.post("/createCart", createCart);
router.get("/getCart/:id",getCart)
router.delete("/removeCart/:id", removeCart);

export default router;
