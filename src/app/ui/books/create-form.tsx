'use client'
import Link from "next/link";
import Button from "../button";
import { createBook } from "@/lib/actions";


export default function CreateForm() {
  return (
    <form action={createBook}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <div className="mb-4">
          <label htmlFor="id" className="mb-2 block text-sm font-medium">
            Id
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                type="number"
                id="id"
                name="id"
                placeholder="1111"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        <div
          id="customer-error"
          className=""
          aria-live="polite"
          aria-atomic="true"
        ></div>

        <div className="mt-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            descripcion
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Description"
                className="peer block w-full rounded-md border border-gray-300 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        <div className="" aria-live="polite" aria-atomic="true"></div>

        <div className="mt-4">
          <label htmlFor="author" className="mb-2 block text-sm font-medium">
            Author
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="author"
                name="author"
                type="text"
                placeholder="Author"
                className="peer block w-full rounded-md border border-gray-300 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        <div className="error" aria-live="polite" aria-atomic="true"></div>
        <div className="mt-4">
          <label htmlFor="price" className="block mb-2 text-sm font-medium">
            Price
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="price"
                name="price"
                type="number"
                placeholder="100"
                step="0.01"
                className="peer block w-full rounded-md border border-gray-300 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        <div className="" aria-live="polite" aria-atomic="true">

        </div>
        <div className="mt-6 flex justify-end gap-4">
            <Link href={'/books'}
            className="rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
            Cancel</Link>
            <Button type="submit">
                Crear Book
            </Button>
        </div>
      </div>
    </form>
  );
}
