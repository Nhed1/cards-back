import express, { Request, Response } from "express";
import {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "./handlers";

const router = express.Router();

// Mock user data (you'd typically use a database)
const users: { [email: string]: { password: string; refreshToken: string } } =
  {};

router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (users[email]) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await hashPassword(password);
  users[email] = { password: hashedPassword, refreshToken: "" };

  res.status(201).json({ message: "User registered successfully" });
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users[email];

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const accessToken = generateAccessToken(email);
  const refreshToken = generateRefreshToken(email);

  user.refreshToken = refreshToken;

  res.json({ accessToken, refreshToken });
});

router.post("/refresh-token", (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }
  try {
    const { userId } = verifyRefreshToken(refreshToken);
    const newAccessToken = generateAccessToken(userId);
    const newRefreshToken = generateRefreshToken(userId);

    users[userId].refreshToken = newRefreshToken;

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
});

export default router;
