import { Book } from "@/lib/definitions";
import Link from "next/link";
import Button from "../button";

export default async function EditBookForm({ book }: { book: Book }) {
  return (
    <form action="">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                className="peer block w-full border rounded-md border-gray-200 outline-2 py-2 pl-10 text-sm placeholder:text-gray-500"
                defaultValue={book.title}
              />
            </div>
          </div>
        </div>
        <div className=""></div>
        <div className="mb-4">
          <label htmlFor="" className="mb-2 block text-sm font-medium">
            Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                type="text"
                className="peer block w-full border rounded-md border-gray-200 py-2 pl-10 outline-2 text-sm placeholder:text-gray-500"
                defaultValue={book.description}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
            <label htmlFor="author" className="block mb-2  text-sm font-medium">
                Author
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <input
                    id="author"
                    name="author"
                    type="text"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 outline-2 text-sm placeholder:text-gray-500"
                    defaultValue={book.author}
                    />
                </div>
            </div>
        </div>

        <div className="mb-4">
            <label htmlFor="" className="block mb-2 text-sm font-medium">
                Price
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <input 
                    id="price"
                    name="price"
                    type="number"
                    className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    defaultValue={book.price}
                    />
                </div>
            </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
            <Link href="/books"
            className="flex h-10 items-center rounded-lg bg-gray-300 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
            Cancel
            </Link>
            <Button type="submit">Edit Book</Button>
        </div>



      </div>
    </form>
  );
}
