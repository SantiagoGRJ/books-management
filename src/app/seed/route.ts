import { books } from "@/lib/placeholder-data";
import { db } from "@vercel/postgres";




const client = await db.connect()

async function seedBooks() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    await client.sql`
      CREATE TABLE IF NOT EXISTS books (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      author TEXT NOT NULL,
      price INT NOT NULL
      )  
      `

    const insertedBook = await Promise.all(
        books.map((book) => client.sql`
    INSERT INTO books (id,title,description,author,price)
    VALUES (${book.id},${book.title},${book.description},${book.author},${book.price})
    ON CONFLICT (id) DO NOTHING;
    `)
    )

    return insertedBook

}

export async function GET() {

    try {
        await client.sql`BEGIN`
        await seedBooks()
        await client.sql`COMMIT`
        return Response.json({ message: 'Database seeded successfully' })
    } catch (error) {
        await client.sql`ROLLBACK`
        return Response.json({ error }, { status: 500 })

    }
}