import { db } from "@vercel/postgres";



const client = db.connect()

async function seedBooks(){
   ( await client).sql`CREATE EXTESION`
}