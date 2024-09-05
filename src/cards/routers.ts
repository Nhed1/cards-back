import { Router } from "express";
import { createCard, getCardById, listCards } from "./handlers";

const router = Router();

router.post("/", createCard);
router.get("/", listCards);
router.get("/:id", getCardById);

export default router;
