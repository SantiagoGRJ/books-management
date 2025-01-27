
import { CreateBook } from "@/ui/books/buttons";
import Table from "@/ui/books/table";
import Search from "@/ui/search";


interface propsPage {
  searchParams?: Promise<{
    query?:string
  }>
}

export default async function HomeBook(props:propsPage) {

  const searchParams = await props.searchParams;
  const query = searchParams?.query || ''

  return (
    
     <div className="">
       <div className="flex gap-2">
       <CreateBook />
       <Search placeholder="Search..."/>
       </div>
       <Table query={query} />
     </div>
    
  );
}
