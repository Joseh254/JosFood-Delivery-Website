import { Router } from "express";
const router = Router();
router.post("/auth/login", (request, response) => {
  response.send("loggin you in");
});
export default router;
