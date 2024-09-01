CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"refresh_token" text DEFAULT '',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
