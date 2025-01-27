import SideNav from "@/ui/books/sidenav";


export default function RootLayout(
    { children} : Readonly<{children:React.ReactNode}>
){
    return(
       <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
            <SideNav/>
        </div>
         <div className="flex-grow p-4 md:overflow-x-auto md:p-12">{children}</div>
       </div>
    )
}