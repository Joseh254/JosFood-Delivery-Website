import express from "express";
import users from "./Routes/usersRoute.js";
import products from "./Routes/productsRoute.js"
import cart from "./Routes/cartRoute.js";
import cors from 'cors';
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", users);
app.use("/api/products",products);
app.use("/api/cart",cart)
app.listen(3000, () => {
  console.log("Server running ....");
});
