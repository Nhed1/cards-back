import { relations } from "drizzle-orm/relations";
import { decks, cards, users } from "./schema";

export const cardsRelations = relations(cards, ({one}) => ({
	deck: one(decks, {
		fields: [cards.deckId],
		references: [decks.id]
	}),
}));

export const decksRelations = relations(decks, ({one, many}) => ({
	cards: many(cards),
	user: one(users, {
		fields: [decks.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	decks: many(decks),
}));