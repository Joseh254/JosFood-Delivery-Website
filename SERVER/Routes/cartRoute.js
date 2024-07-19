import { Router } from "express";
import { createCart,removeCart } from "../Controllers/cartContoller.js";
const router = Router()
router.post("/createCart",createCart)
router.delete("/removeCart",removeCart)

export default router;