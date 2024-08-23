import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const userInfo = pgTable("userInfo", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  usename: varchar("username"),
  location: varchar("location"),
  Url: varchar("Url"),
  bio:text("bio"),
  profileImageUrl:varchar("profileImageUrl"),
});
