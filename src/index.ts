import express from "express";
import authRouter from "./auth/route";

const app = express();

app.use("/api/auth", authRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Running on Port " + PORT);
});
