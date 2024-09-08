import { pgTable, unique, serial, varchar, text, timestamp, foreignKey, integer } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const users = pgTable("users", {
	id: serial("id").primaryKey().notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	password: text("password").notNull(),
	refreshToken: text("refresh_token").default(''),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		usersEmailUnique: unique("users_email_unique").on(table.email),
	}
});

export const cards = pgTable("cards", {
	id: serial("id").primaryKey().notNull(),
	deckId: integer("deck_id").notNull(),
	frontMessage: text("front_message").notNull(),
	backMessage: text("back_message").notNull(),
	difficulty: integer("difficulty").default(2).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		cardsDeckIdDecksIdFk: foreignKey({
			columns: [table.deckId],
			foreignColumns: [decks.id],
			name: "cards_deck_id_decks_id_fk"
		}),
	}
});

export const decks = pgTable("decks", {
	id: serial("id").primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	title: text("title").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		decksUserIdUsersIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "decks_user_id_users_id_fk"
		}),
	}
});