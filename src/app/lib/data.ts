import { sql } from "@vercel/postgres";
import { Book } from "./definitions";



export async function fetchBooks(){

    try{
        const data = await sql<Book>`SELECT * FROM books ORDER BY price DESC`
        
        return data.rows
    }catch(error){
        console.error(`Database Error `+error);
        throw new Error(`Failed to Fetch books`)
        
    }
}
