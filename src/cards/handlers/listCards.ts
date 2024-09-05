import { Request, Response } from "express";
import { listCardsDb } from "../data-access";

export const listCards = async (
  req: Request<{}, {}, { deckId: number }>,
  res: Response
) => {
  const { deckId } = req.body;

  try {
    const cardsList = await listCardsDb(deckId);

    res.status(200).json({ cards: cardsList });
  } catch (e) {
    res.status(400).json({ message: "error listing cards: ", error: e });
  }
};
