import { fetchBookGetById } from "@/lib/data"
import Form from "@/ui/books/edit-form"
import { notFound } from "next/navigation"



export default async function Page(props:{params: Promise<{ id:string }>}){
   const params = await props.params
   const id = params.id
   const book = await fetchBookGetById(Number(id))
   
   if(!book){
    notFound()
   }
   
    return(
        <>
        <Form book={book} />
        </>
    )
}