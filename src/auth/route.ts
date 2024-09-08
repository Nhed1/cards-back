import express, { Request, Response } from "express";
import {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "./utils";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await hashPassword(password);
  const [newUser] = await db
    .insert(users)
    .values({ email, hashedPassword })
    .returning({ id: users.id });

  const accessToken = generateAccessToken(newUser.id);
  const refreshToken = generateRefreshToken(newUser.id);

  res.status(201).json({
    message: "User registered successfully",
    user: newUser,
    accessToken,
    refreshToken,
  });
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (!existingUser) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await comparePassword(
    password,
    existingUser.hashedPassword
  );

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const accessToken = generateAccessToken(existingUser.id);
  const refreshToken = generateRefreshToken(existingUser.id);

  await db.update(users).set({ refreshToken }).where(eq(users.email, email));

  res.json({ accessToken, refreshToken });
});

router.post("/refresh-token", async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }
  try {
    const { userId } = verifyRefreshToken(refreshToken);

    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (!existingUser || existingUser.refreshToken !== refreshToken)
      return res.status(403).json({ message: "Invalid refresh token" });

    const newAccessToken = generateAccessToken(userId);
    const newRefreshToken = generateRefreshToken(userId);

    await db
      .update(users)
      .set({ refreshToken: newRefreshToken })
      .where(eq(users.id, userId));

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
});

export default router;
