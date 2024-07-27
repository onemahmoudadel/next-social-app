import * as schema from './schema'
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connection = postgres(process.env.DB_URL!);
const db = drizzle(connection,{
	schema,
	// logger:true
});

export type db = typeof db
export default db
