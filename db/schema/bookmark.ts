import {  relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import {  pgTable,primaryKey,text,timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { post, user } from "./index";
import { z } from "zod";

export const bookmarkTable = pgTable(
  "bookmark",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    postId: uuid("post_id")
      .notNull()
      .references(() => post.id),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.postId, table.userId] })
  })
);


export const bookmarksRelations  = relations( bookmarkTable,( { one } )=> ({
	user: one(user,{
		fields:[bookmarkTable.userId],
		references:[user.id]
	})
}))
export default bookmarkTable
