import { relations } from "drizzle-orm";
import { pgTable, primaryKey, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { post, user } from "./index";

export const likeTable = pgTable(
  "like",
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

export const likesRelations  = relations( likeTable,( { one } )=> ({
	user: one(user,{
		fields:[likeTable.userId],
		references:[user.id]
	}),
  post:one(post,{
    fields:[likeTable.postId],
    references:[post.id]
  })
}))
export default likeTable
