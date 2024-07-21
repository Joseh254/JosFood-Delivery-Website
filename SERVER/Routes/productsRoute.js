import { Router } from "express";
import { createProduct,GetAllProducts,GetOneProduct,UpdateProduct,deleteProduct } from "../Controllers/productsController.js";
import VerifyAdmin from "../Middleware/VerifyAdmin.js";
const router = Router()
router.post("/createProduct",VerifyAdmin,createProduct)
router.get("/getAllproducts",VerifyAdmin,GetAllProducts)
router.get("/getOneproduct/:id",VerifyAdmin,GetOneProduct)
router.patch("/updateproduct/:id",VerifyAdmin,UpdateProduct)
router.delete("/deleteproduct/:id",VerifyAdmin,deleteProduct)

export default router;