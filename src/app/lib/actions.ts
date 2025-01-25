"use server"
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const FormSchema = z.object({
    id: z.coerce.number(),
    title: z.string(),
    author: z.string(),
    descrition: z.string(),
    price: z.coerce.number()
})

type State = {
    errors: {
        id:string[]
        title: string[]
        description: string[]
        author: string[]
        price: string[]
    }
    message: string | null
}



export async function createBook(formData: FormData) {
    const { id, title, author, descrition, price } = FormSchema.parse({
        id:formData.get('id'),
        title: formData.get('title'),
        author: formData.get('author'),
        descrition: formData.get('description'),
        price: formData.get('price')
    })

    const amountInPrice = price * 100
    console.log(formData);
    
    await sql`
    INSERT INTO books (id,title,author,description,price) 
    VALUES (${id},${title},${author},${descrition},${amountInPrice})
    `

    revalidatePath('/books')
    redirect('/books')
}
