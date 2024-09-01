import { Request, Response } from "express";
import { db } from "../db";
import { decks } from "../db/schema";

interface Deck {
  name: string;
}

export const createDeck = async (req: Request<{}, {}, Deck>, res: Response) => {
  const { name } = req.body;

  const userId = req.user.id;

  try {
    const [deck] = await db
      .insert(decks)
      .values({ title: name, userId })
      .returning({ id: decks.id });

    res.status(201).json({ message: "deck created successfully", deck });
  } catch (e) {
    res.status(400).json({ message: "error while creating deck: ", error: e });
  }
};

export const listDecks = async (req: Request, res: Response) => {
  try {
    const decks = db.select();

    res.status(200).json({ decks });
  } catch (e) {
    res.status(400).json({ message: "error listing decks: ", error: e });
  }
};
