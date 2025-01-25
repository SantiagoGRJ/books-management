import { fetchBookGetById } from "@/lib/data"
import Form from "@/ui/books/edit-form"



export default async function(props:{params: Promise<{ id:string }>}){
   const params = await props.params
   const id = params.id
   const book = await fetchBookGetById(id)
   
   
    return(
        <>
        <Form book={book} />
        </>
    )
}