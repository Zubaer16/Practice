CREATE TABLE IF NOT EXISTS "user_information" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"address" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar,
	"password" varchar,
	"status" varchar
);
