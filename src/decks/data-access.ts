import { eq } from "drizzle-orm";
import { db } from "../db";
import { decks } from "../db/schema";

export const createDeckDb = async (deckTitle: string, userId: number) => {
  const [deck] = await db
    .insert(decks)
    .values({ title: deckTitle, userId })
    .returning({ id: decks.id });

  return deck;
};

export const listDecksDb = async (userId: number) => {
  const decksList = await db
    .select()
    .from(decks)
    .where(eq(decks.userId, userId));

  return decksList;
};
