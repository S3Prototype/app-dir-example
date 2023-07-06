import { db, UsersTable, seedTable } from "@/lib/db";

export default async function Table() {
  let users;
  let startTime = Date.now();

  try {
    users = await db.select().from(UsersTable);
  } catch (e: any) {
    if (e.message === `relation "users" does not exist`) {
      console.log(
        "Table does not exist, creating and seeding it with dummy data now..."
      );
      // Table is not created yet
      await seedTable();
      startTime = Date.now();
      users = await db.select().from(UsersTable);
    } else {
      throw e;
    }
  }

  const duration = Date.now() - startTime;

  return (
    <div>
      {users.map((user) => (
        <div key={user.name}>
          <div>
            <img src={user.image} alt={user.name} width={48} height={48} />
            <div>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
