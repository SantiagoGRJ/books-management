import { fetchBooks } from "@/lib/data"




export default async function BooksTable(){

    const data = await fetchBooks()
    console.log(data);
    
    return(
        <table>
            <thead>
               <tr>
               <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Author</th>
                <th>Price</th>
               </tr>
            </thead>
            <tbody>
                {data && data.map((book) => (
                    <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.descripcion}</td>
                    <td>{book.author}</td>
                    <td>{book.price}</td>
                    
                </tr>
                ))}
            </tbody>
        </table>
    )


}