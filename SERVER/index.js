import express from "express";
import users from "./Routes/usersRoute.js";
const app = express();
app.use(express.json());
app.use("/api/users", users);

app.listen(3000, () => {
  console.log("Server running ....");
});
