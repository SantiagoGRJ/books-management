



export type Book = {
    id:  string
    title: string
    description: string
    author: string
    price: number 
}
export type placeholderBook = Omit<Book,'id'>


