import { Card } from "../../types";
import dayjs from "dayjs";

enum DIFFICULTY {
  easy = 1,
  normal = 2,
  hard = 3,
}

const THREE_DAYS = 3;

export const filterByDifficulty = (cards: Card[]) => {
  const flashcardsByDifficulty = cards.filter((card) => {
    if (card.difficulty === DIFFICULTY.hard) {
      return card;
    }

    if (card.difficulty === DIFFICULTY.normal) {
      const flashcardUpdatedAt = dayjs(card.updatedAt);
      if (flashcardUpdatedAt.isAfter(dayjs(), "day")) {
        return card;
      }
    }

    if (card.difficulty === DIFFICULTY.easy) {
      const flashcardUpdatedAt = dayjs(card.updatedAt);
      if (flashcardUpdatedAt.diff(dayjs(), "day") >= THREE_DAYS) {
        return card;
      }
    }
  });

  return flashcardsByDifficulty;
};
