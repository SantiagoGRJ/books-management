"use server"
import { sql } from '@vercel/postgres'
import { error } from 'console'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const FormSchema = z.object({
    id: z.coerce.number({
        invalid_type_error: 'Must be a Number'
    }).gt(0, {
        message: 'Please Enter an mount greater than $0'
    }),
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
        id?: string[]
        title?: string[]
        description?: string[]
        author?: string[]
        price?: string[]
    }
    message?: string | null
}



export async function createBook(prevForm: FormData, formData: FormData) {
    const validedFields = FormSchema.safeParse({
        id: formData.get('id'),
        title: formData.get('title'),
        author: formData.get('author'),
        description: formData.get('description'),
        price: formData.get('price')
    })
    console.log(validedFields);


    if (!validedFields.success) {
        return {
            errors: validedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Book.'
        }
    }

    const { id, title, author, description, price } = validedFields.data

    const priceInCents = price * 100

    try {
        await sql`
        INSERT INTO books (id,title,author,description,price) 
        VALUES (${id},${title},${author},${description},${priceInCents})
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

export async function updateBook(id: number, prevState: State, formData: FormData) {

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
    }catch(e){
        return {
            message:`Database Error: Failed Delete Book ${e}`
        }
    }
}