import { Router } from "express";
import {
  createProduct,
  GetAllProducts,
  GetOneProduct,
  UpdateProduct,
  deleteProduct,
} from "../Controllers/productsController.js";
import VerifyAdmin from "../Middleware/VerifyAdmin.js";
const router = Router();
router.post("/createProduct", VerifyAdmin, createProduct);
router.get("/getAllproducts",  GetAllProducts);
router.get("/getOneproduct/:id", GetOneProduct);
router.patch("/updateproduct/:id", VerifyAdmin, UpdateProduct);
router.delete("/deleteproduct/:id", deleteProduct);

export default router;
