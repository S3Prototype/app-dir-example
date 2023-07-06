import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

export const UsersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    image: text("image").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(users.email),
    };
  }
);

export type User = InferModel<typeof UsersTable>;
export type NewUser = InferModel<typeof UsersTable, "insert">;

const newUsers: NewUser[] = [
  {
    name: "Guillermo Rauch",
    email: "rauchg@vercel.com",
    image:
      "https://pbs.twimg.com/profile_images/1576257734810312704/ucxb4lHy_400x400.jpg",
  },
  {
    name: "Lee Robinson",
    email: "lee@vercel.com",
    image:
      "https://pbs.twimg.com/profile_images/1587647097670467584/adWRdqQ6_400x400.jpg",
  },
  {
    name: "Steven Tey",
    email: "stey@vercel.com",
    image:
      "https://pbs.twimg.com/profile_images/1506792347840888834/dS-r50Je_400x400.jpg",
  },
];

export async function seedTable() {
  // Create table with raw SQL
  const createTable = await sql.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        image VARCHAR(255),
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
  `);
  console.log(`Created "users" table`);

  const insertedUsers: User[] = await db
    .insert(UsersTable)
    .values(newUsers)
    .returning();
  console.log(`Seeded ${insertedUsers.length} users`);

  return {
    createTable,
    insertedUsers,
  };
}

// Connect to Vercel Postgres
export const db = drizzle(sql);
