
import { CreateBook } from "@/ui/books/buttons";
import BooksTable from "@/ui/books/table";

export default async function HomeBook() {
  return (
    <>
      <CreateBook />
      <BooksTable />
    </>
  );
}
