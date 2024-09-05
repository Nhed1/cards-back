import { Request, Response } from "express";
import { db } from "../db";
import { cards } from "../db/schema";
import { eq } from "drizzle-orm";

interface Card {
  frontMessage: string;
  backMessage: string;
  difficulty: number;
  deckId: number;
}

export const createCard = async (req: Request<{}, {}, Card>, res: Response) => {
  const { backMessage, difficulty, frontMessage, deckId } = req.body;

  try {
    const [card] = await db
      .insert(cards)
      .values({ backMessage, difficulty, frontMessage, deckId })
      .returning({ id: cards.id });

    res.status(201).json({ message: "card created successfully", card });
  } catch (e) {
    res.status(400).json({ message: "error while creating card: ", error: e });
  }
};

export const listCards = async (
  req: Request<{}, {}, { deckId: number }>,
  res: Response
) => {
  const { deckId } = req.body;

  try {
    const cardsList = await db
      .select()
      .from(cards)
      .where(eq(cards.deckId, deckId));

    res.status(200).json({ cards: cardsList });
  } catch (e) {
    res.status(400).json({ message: "error listing cards: ", error: e });
  }
};

export const getCardById = async (
  req: Request<{}, {}, { cardId: number }>,
  res: Response
) => {
  const { cardId } = req.body;

  try {
    const [card] = await db.select().from(cards).where(eq(cards.id, cardId));

    res.status(200).json({ card });
  } catch (e) {
    res.status(400).json({ message: "error getting card: ", error: e });
  }
};
