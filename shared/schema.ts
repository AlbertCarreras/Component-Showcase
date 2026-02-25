import { pgTable, text, serial } from "drizzle-orm/pg-core";

export const components = pgTable("components", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  code: text("code").notNull(),
});

export type Component = typeof components.$inferSelect;