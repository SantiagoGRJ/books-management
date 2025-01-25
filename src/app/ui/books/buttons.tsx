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

