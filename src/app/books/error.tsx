'use client'

import { useEffect } from "react"


export default function Error(
    {
        error,
        reset,
    }:{
        error : Error & { digest?:string },
        reset: () => void
    }
){
    useEffect(() => {
        console.error(error);
        
    },[error])

    return(
        <div className="flex h-screen items-center flex-col justify-center">
            <h2>Someting went Wrong!</h2>
            <button
            className="bg-red-600 p-2 rounded-md text-white flex items-center hover:bg-red-400"
            onClick={() => reset()}
            >
                Try Again!
            </button>
        </div>
    )

}