import { deleteBook } from "@/lib/actions";
import Link from "next/link";


export function CreateBook(){
    return(
        <Link 
        href={`/books/create`} 
        className="flex p-2 items-center text-sm rounded-lg bg-gray-300"
        >
            Create Book
        </Link>
    )
}
export function UpdateBook({id}:{id:number}){
    return(
        <Link href={`/books/${id}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
        >
        Update
        </Link>
    )
}

export function DeleteBook({id}:{id:number}){
    const deleteBookWithId = deleteBook.bind(null,id)

    return(
        <form action={deleteBookWithId}>
            <button
            type="submit"
            className="rounded-md border p-2 hover:bg-gray-100"
            >
                Delete
            </button>
        </form>
    )
}

