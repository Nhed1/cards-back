import { Request, Response } from "express";
import { updateCardDifficultyDb } from "../data-access";

export const updateCardDifficulty = async (
  req: Request<{}, {}, { cardId: number; difficulty: number }>,
  res: Response
) => {
  const { cardId, difficulty } = req.body;

  try {
    const card = await updateCardDifficultyDb(difficulty, cardId);

    res.status(200).json({ card });
  } catch (e) {
    res.status(400).json({ message: "error updating card: ", error: e });
  }
};
