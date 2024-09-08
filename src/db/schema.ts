import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  hashedPassword: text("password").notNull(),
  refreshToken: text("refresh_token").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const decks = pgTable("decks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

enum DIFFICULTY {
  easy = 1,
  normal = 2,
  hard = 3,
}

export const cards = pgTable("cards", {
  id: serial("id").primaryKey(),
  deckId: integer("deck_id")
    .references(() => decks.id)
    .notNull(),
  frontMessage: text("front_message").notNull(),
  backMessage: text("back_message").notNull(),
  difficulty: integer("difficulty").notNull().default(DIFFICULTY.normal),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
