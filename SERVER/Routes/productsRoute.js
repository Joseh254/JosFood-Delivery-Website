import { Router } from "express";
import { createProduct,GetAllProducts,GetOneProduct,UpdateProduct,deleteProduct } from "../Controllers/productsController.js";
const router = Router()
router.post("/createProduct",createProduct)
router.get("/getAllproducts",GetAllProducts)
router.get("/getOneproduct",GetOneProduct)
router.patch("/updateproduct",UpdateProduct)
router.delete("/deleteproduct/:id",deleteProduct)

export default router;