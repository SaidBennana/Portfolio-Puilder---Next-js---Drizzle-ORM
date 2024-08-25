import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const userInfo = pgTable("userInfo", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  usename: varchar("username"),
  location: varchar("location"),
  Url: varchar("Url"),
  bio: text("bio"),
  profileImageUrl: varchar("profileImageUrl"),
  theme: varchar("theme").default("light"),
});

export const project = pgTable("project", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
  desc: text("desc"),
  url: varchar("url").notNull(),
  logo: varchar("logo"),
  banner: varchar("banner"),
  category: varchar("category"),
  active: boolean("active").$default(() => true),
  email: varchar("email"),
  userRef: integer("userRef").references(() => userInfo?.id),
  order: integer("order").$default(() => 0),
});

export const projectClick = pgTable("projectClick", {
  id: serial("id").primaryKey(),
  projectRef: integer("projectRef").references(() => project?.id),
  month: varchar("month"),
});

export const ProjectRelation = relations(userInfo, ({ many }) => ({
  project: many(project),
}));

export const postRelation = relations(project, ({ one }) => ({
  user: one(userInfo, { fields: [project.userRef], references: [userInfo.id] }),
}));
