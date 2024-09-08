import { Request, Response } from "express";
import { listCardsDb } from "../../data-access";
import { filterByDifficulty } from "./filterByDifficulty";

export const listCards = async (
  req: Request<{}, {}, { deckId: number }, { by_difficulty: boolean }>,
  res: Response
) => {
  const { by_difficulty } = req.query;
  const { deckId } = req.body;

  try {
    const cardsList = await listCardsDb(deckId);

    if (by_difficulty) {
      const cardsFiltered = filterByDifficulty(cardsList);

      return res.status(200).json({ cards: cardsFiltered });
    }

    return res.status(200).json({ cards: cardsList });
  } catch (e) {
    return res.status(400).json({ message: "error listing cards: ", error: e });
  }
};
