"use server"
import { sql } from '@vercel/postgres'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const FormSchema = z.object({
    id: z.string(),
    title: z.string().min(3, { message: 'Min 3 Letter' }),
    author: z.string({
        invalid_type_error: 'Must be a text Value'
    }).min(3, { message: 'Min 3 Letter' }),
    description: z.string({
        invalid_type_error: 'Must be a text Value'
    }).min(3, { message: 'Min 3 Letter' }),
    price: z.coerce.number({
        invalid_type_error: 'Must be a Number'
    }).gt(0, { message: 'Please Enter an mount greater than $0' })
})

export type State = {
    errors?: {
       
        title?: string[]
        description?: string[]
        author?: string[]
        price?: string[]
    }
    message: string 
}



export async function createBook(prevForm: FormData | State, formData: FormData) {
    const validedFields = FormSchema.safeParse({
        title: formData.get('title'),
        author: formData.get('author'),
        description: formData.get('description'),
        price: formData.get('price')
    })
   


    if (!validedFields.success) {
        return {
            errors: validedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Book.'
        }
    }

    const {  title, author, description, price } = validedFields.data

    const priceInCents = price * 100

    try {
        await sql`
        INSERT INTO books (title,author,description,price) 
        VALUES (${title},${author},${description},${priceInCents})
        `

    } catch (e) {
        return {
            message: 'Database Error: Failed to Create Book ' + e,
        }
    }


    revalidatePath('/books')
    redirect('/books')
}

const UpdateBook = FormSchema.omit({ id: true })

export async function updateBook(id: string, prevState: State, formData: FormData) {

    const validatedFields = UpdateBook.safeParse({
        title: formData.get('title'),
        author: formData.get('author'),
        description: formData.get('description'),
        price: formData.get('price')
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Book.'
        }
    }


    const { title, author, description, price } = validatedFields.data

    const priceInCents = price * 100

    try {
        await sql`
    UPDATE books
    SET title = ${title}, author = ${author}, description=${description}, price = ${priceInCents}
    WHERE id = ${id}
    `
    } catch (error) {

        return {
            message: `Databa Failed: Error Update Book. ${error}`
        }

    }

    revalidatePath('/books')
    redirect('/books')

}

export async function deleteBook(id: number) {
   
    try{
        await sql`
        DELETE FROM books WHERE id = ${id}`
        revalidatePath('/books')
    }catch(e : unknown){
       
        if (e instanceof Error) {
            throw new Error(`Database Error: Fail Delete Book - ${e.message}`);
        } else {
            throw new Error('Database Error: Fail Delete Book - Unknown error');
        } 
    }
}