import { Request, Response } from "express";
import { createDeckDb, listDecksDb } from "../data-access";

interface Deck {
  name: string;
}

export const createDeck = async (req: Request<{}, {}, Deck>, res: Response) => {
  const { name } = req.body;

  const userId = req.user.id;

  try {
    const deck = await createDeckDb(name, userId);

    res.status(201).json({ message: "deck created successfully", deck });
  } catch (e) {
    res.status(400).json({ message: "error while creating deck: ", error: e });
  }
};

export const listDecks = async (req: Request, res: Response) => {
  try {
    const decksList = await listDecksDb(req.user.id);

    res.status(200).json({ decks: decksList });
  } catch (e) {
    res.status(400).json({ message: "error listing decks: ", error: e });
  }
};
