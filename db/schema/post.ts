import {  relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { index, pgTable, text,timestamp, uuid } from "drizzle-orm/pg-core";
import { likes, user } from "./index";
import { z } from "zod";

export const postTable = pgTable("post", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: text("user_id")
		.notNull().references(()=>user.id,{onDelete:"cascade"}),
		text: text("text").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
		image:text("image"),
	},(t) => {
  return {
    PostUserIdx: index('post_user_idx').on(t.userId),
  }
});

// Schema for inserting a user - can be used to validate API requests
export const insertPostSchema = createInsertSchema(postTable);
// Schema for selecting a user - can be used to validate API responses
export const selectPostSchema = createSelectSchema(postTable);

export type SelectPost = z.infer<typeof selectPostSchema>
export type InsertPost = z.infer<typeof insertPostSchema>

export const postRelations = relations( postTable,( { one,many } )=> ({
	user: one(user,{
		fields:[postTable.userId],
		references:[user.id]
	}),
	likes: many(likes),
}))
export default postTable
