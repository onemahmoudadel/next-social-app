import { relations } from "drizzle-orm";
import { pgTable,primaryKey, text,timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { user } from "./index";

export const followsTable = pgTable("follows", {
	followingUserId: text("following_user_id")
		.notNull().references(()=>user.id,{onDelete:"cascade"}),
	followedUserId: text("followed_user_id")
		.notNull().references(()=>user.id,{onDelete:"cascade"}),
	createAt: timestamp('create_at').defaultNow(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.followingUserId, table.followedUserId] }),
  };
});


export const followsUserRelations = relations( followsTable,( { one} )=> ({
	Followers: one(user,{
		fields:[followsTable.followedUserId],
		references:[user.id],
		relationName:"followers"
	}),
	Followings: one(user,{
		fields:[followsTable.followingUserId],
		references:[user.id],
		relationName:"followings"
	}),
}))
export default followsTable
