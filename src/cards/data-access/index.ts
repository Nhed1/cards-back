import { eq } from "drizzle-orm";
import { db } from "../../db";
import { cards } from "../../db/schema";
import { Card } from "../types";

export const listCardsDb = async (deckId: number) => {
  const cardsList = await db
    .select()
    .from(cards)
    .where(eq(cards.deckId, deckId));

  return cardsList;
};

export const createCardDb = async (card: Card) => {
  const { backMessage, deckId, difficulty, frontMessage } = card;

  const [cardReturned] = await db
    .insert(cards)
    .values({ backMessage, difficulty, frontMessage, deckId })
    .returning({ id: cards.id });

  return cardReturned;
};

export const getCardByIdDb = async (cardId: number) => {
  const [card] = await db.select().from(cards).where(eq(cards.id, cardId));

  return card;
};
