import { Request, Response } from "express";
import { createCardDb } from "../data-access";

interface Card {
  frontMessage: string;
  backMessage: string;
  difficulty: number;
  deckId: number;
}

export const createCard = async (req: Request<{}, {}, Card>, res: Response) => {
  const cardBody = req.body;

  try {
    const card = await createCardDb(cardBody);

    res.status(201).json({ message: "card created successfully", card });
  } catch (e) {
    res.status(400).json({ message: "error while creating card: ", error: e });
  }
};
