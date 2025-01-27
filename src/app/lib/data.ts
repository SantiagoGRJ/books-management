import { sql } from "@vercel/postgres";
import { Book } from "./definitions";



export async function fetchBooks() {

    try {
        const data = await sql<Book>`SELECT * FROM books ORDER BY price DESC`

        return data.rows
    } catch (error) {
        console.error(`Database Error ` + error);
        throw new Error(`Failed to Fetch books`)

    }
}

export async function fetchBookGetById(id: number) {

    try {
        const data = await sql<Book>`
        SELECT
        books.id,
        books.title,
        books.description,
        books.author,
        books.price
        FROM books 
        WHERE books.id = ${id};
        `



        const book = data.rows.map((book) => ({
            ...book,
            price: book.price / 100,
        }))
        return book[0]
    } catch (e) {
        console.log(`Database Error `, e);
        throw new Error('Failed to Fetch Book')

    }

}

export async function fetchFilteredBooks(query: string) {

    try {
        const books = await sql`
        SELECT 
        books.id,
        books.title,
        books.description,
        books.author,
        books.price
        FROM books
        WHERE 
        books.id::text ILIKE ${`%${query}%`} OR 
        books.title ILIKE ${`%${query}%`} OR
        books.description ILIKE ${`%${query}%`} OR
        books.author ILIKE ${`%${query}%`} OR 
        books.price::text ILIKE ${`%${query}%`} 
        
        `
        return books.rows
    } catch (e) {
        console.error('Database Error: ',e);
        throw new Error('Failed to fetch Invoices.')
        
    }
}
