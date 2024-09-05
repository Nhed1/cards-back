import { Router } from "express";
import { createDeck, listDecks } from "../handlers";

const router = Router();

router.post("/", createDeck);
router.get("/", listDecks);

export default router;
