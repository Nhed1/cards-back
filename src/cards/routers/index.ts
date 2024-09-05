import { Router } from "express";
import { createCard } from "../handlers/createCard";
import { listCards } from "../handlers/listCards";
import { getCardById } from "../handlers/getCardById";
import { updateCardDifficulty } from "../handlers/updateCardDifficulty";

const router = Router();

router.post("/", createCard);
router.get("/", listCards);
router.get("/:id", getCardById);
router.put("/:id", updateCardDifficulty);

export default router;
