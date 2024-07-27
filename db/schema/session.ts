import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user }  from "./index";


export const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});

export const sessionRelations = relations( sessionTable,( { one } )=> ({
	user: one(user,{
    fields: [sessionTable.userId],
    references: [user.id],
  })
}))

export default sessionTable