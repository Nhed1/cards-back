import express from "express";
import usersRouter from "./users/routers";
import authRouter from "./auth/route";

const app = express();

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Running on Port " + PORT);
});
