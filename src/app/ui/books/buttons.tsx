import Link from "next/link";


export function CreateBook(){
    return(
        <Link 
        href={`/books/create`} 
        className=""
        >
            Create Book
        </Link>
    )
}

