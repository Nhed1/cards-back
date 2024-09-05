import { Request, Response } from "express";
import { getCardByIdDb } from "../data-access";

export const getCardById = async (
  req: Request<{}, {}, { cardId: number }>,
  res: Response
) => {
  const { cardId } = req.body;

  try {
    const card = getCardByIdDb(cardId);

    res.status(200).json({ card });
  } catch (e) {
    res.status(400).json({ message: "error getting card: ", error: e });
  }
};
