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

export type State = {
    errors?: {
        id?: string[]
        title?: string[]
        description?: string[]
        author?: string[]
        price?: string[]
    }
    message: string | null
}



export async function createBook(formData: FormData) {
    const { id, title, author, descrition, price } = FormSchema.parse({
        id: formData.get('id'),
        title: formData.get('title'),
        author: formData.get('author'),
        descrition: formData.get('description'),
        price: formData.get('price')
    })

    const priceInCents = price * 100
    console.log(formData);

    await sql`
    INSERT INTO books (id,title,author,description,price) 
    VALUES (${id},${title},${author},${descrition},${priceInCents})
    `

    revalidatePath('/books')
    redirect('/books')
}

const UpdateBook = FormSchema.omit({ id: true })

export async function updateBook( id: number,
    prevState: State,
    formData: FormData) {

    const { title, author, descrition, price } = UpdateBook.parse({
        title: formData.get('title'),
        author: formData.get('author'),
        descrition: formData.get('description'),
        price: formData.get('price')
    })

    const priceInCents = price * 100

    try {
        await sql`
    UPDATE books
    SET title = ${title}, author = ${author}, description=${descrition}, price = ${priceInCents}
    WHERE id = ${id}
    `
    } catch (error) {
        console.error('Databa Failed: Error Update Book',error);
        
        
    }

    revalidatePath('/books')
    redirect('/books')

}

export async function deleteBook(id:number){
    await sql`
    DELETE FROM books WHERE id = ${id}`
    revalidatePath('/books')
}