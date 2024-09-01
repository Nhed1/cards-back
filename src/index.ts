import express from "express";
import authRouter from "./auth/route";
import decksRouter from "./decks/routers";
import { authenticateToken } from "./auth/middleware";

const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/decks", authenticateToken, decksRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Running on Port " + PORT);
});
