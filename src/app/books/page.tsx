
import { fetchBooksPages } from "@/lib/data";
import { CreateBook } from "@/ui/books/buttons";
import Pagination from "@/ui/books/pagination";
import Table from "@/ui/books/table";
import Search from "@/ui/search";


interface propsPage {
  searchParams?: Promise<{
    query?:string
    page?: string
  }>
}

export default async function HomeBook(props:propsPage) {

  const searchParams = await props.searchParams;
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1
  const totalPages = await fetchBooksPages(query)

  
  return (
    
     <div className="w-full">
       <div className="flex gap-2">
       <CreateBook />
       <Search placeholder="Search..."/>
       </div>
       <Table currentPage={currentPage} query={query} />
       <div className="mt-5 flex w-full justify-center">
        {<Pagination totalPages={totalPages} />}
       </div>
     </div>
    
  );
}
