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

const ITEMS_FOR_PAGE = 6
export async function fetchFilteredBooks(query: string,currentPage:number) {
    const offeset =  (currentPage -1) * ITEMS_FOR_PAGE
    console.log(offeset);
    
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
        LIMIT ${ITEMS_FOR_PAGE} OFFSET ${currentPage}
        
        `
        return books.rows
    } catch (e) {
        console.error('Database Error: ', e);
        throw new Error('Failed to fetch Invoices.')

    }
}

export async function fetchBooksPages(query: string) {
    try {
        const count = await sql`SELECT COUNT(*)
        FROM books 
        WHERE 
        books.id::text ILIKE ${`%${query}%`} OR 
        books.title ILIKE ${`%${query}%`} OR 
        books.description ILIKE ${`%${query}%`} OR
        books.author ILIKE ${`%${query}%`} OR
        books.price::text ILIKE ${`%${query}%`}
        `;
        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_FOR_PAGE)
        return totalPages
    } catch (e) {
        console.error(`Database Error: ${e}`)
        throw new Error(`Failed to fetch Total Number of Books`)
    }
}


