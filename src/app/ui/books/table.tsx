import { fetchBooks } from "@/lib/data";


export default async function BooksTable() {
  const data = await fetchBooks();
  

  return (
    <table className="hidden min-w-full text-gray-900 md:table ">
      <thead className="rounded-lg text-left text-sm font-normal">
        <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
          <th scope="col" className="px-4 py-5">
            #
          </th>
          <th scope="col" className="px-4 py-5">
            Title
          </th>
          <th scope="col" className="px-4 py-5">
            Description
          </th>
          <th scope="col" className="px-4 py-5">
            Author
          </th>
          <th scope="col" className="px-4 py-5">
            Price
          </th>
          <th scope="col" className="px-4 py-5">
            Edit
          </th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((book) => (
            <tr className="" key={book.id}>
              <td className="whitespace-nowrap px-3 py-3">{book.id}</td>
              <td className="whitespace-nowrap px-3 py-3">{book.title}</td>
              <td className="whitespace-nowrap px-3 py-3">{book.description}</td>
              <td className="whitespace-nowrap px-3 py-3">{book.author}</td>
              <td className="whitespace-nowrap px-3 py-3">{book.price}</td>
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                    
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
