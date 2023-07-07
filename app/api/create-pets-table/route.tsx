import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url);
  // const tableName = searchParams.get("tableName");
  // const testName = "abc123";
  try {
    // if (!tableName) throw new Error("Table name required");
    await sql`CREATE TABLE Pets4 ( Name varchar(255), Owner varchar(255) );`;
  } catch (error) {
    return NextResponse.json(
      { error, where: "Creating table" },
      { status: 500 }
    );
  }

  const newTable = await sql`SELECT * FROM ${tableName};`;
  return NextResponse.json(
    { newTable, where: "Fetching table" },
    { status: 200 }
  );
}
