import express from "express";
import users from "./Routes/usersRoute.js";
import products from "./Routes/productsRoute.js"
const app = express();
app.use(express.json());
app.use("/api/users", users);
app.use("/api/products",products)

app.listen(3000, () => {
  console.log("Server running ....");
});
