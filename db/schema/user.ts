import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { pgTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import {post,session,follows, likes, bookmark} from "./index";
import { z } from "zod";

export const userTable = pgTable("user", {
	id: text("id").primaryKey(),
	name: varchar('name',{length:256}).notNull(),
	bio: varchar('bio',{length:256}),
	image:varchar('image',{length:256}),
	coverImage:varchar('cover_image',{length:256}),
	createdAt: timestamp("create_at").defaultNow(),
	//auth
	username: varchar('username',{length:256}).unique().notNull(),
	passwordHash: text("password_hash"),
	avatarUrl: varchar("avatar_url",{length:256}),
	githubId:text("github_id").unique(),
	googleId:text("google_id").unique(),
},(t) => {
  return {
    usernameIndex: uniqueIndex('username_idx').on(t.username),
  }
});

// Schema for inserting a user - can be used to validate API requests
export const insertUserSchema = createInsertSchema(userTable);
// Schema for selecting a user - can be used to validate API responses
export const selectUserSchema = createSelectSchema(userTable);

export type SelectUser = z.infer<typeof selectUserSchema>
export type InsertUser = z.infer<typeof insertUserSchema>


// following             Follow[]       @relation("Following")
// followers             Follow[]       @relation("Followers")

// comments              Comment[]
export const userRelations = relations( userTable,( { many } )=> ({
	sessions: many(session),
	posts: many(post),
  likes: many(likes),
  bookmarks: many(bookmark),

	Followers: many(follows,{
		relationName:"followers"
	}),
	Followings: many(follows,{
		relationName:"followings"
	}),
}))
export default userTable
