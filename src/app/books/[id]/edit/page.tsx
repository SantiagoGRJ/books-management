


export default async function(props:{params: Promise<{ id:string }>}){
   const params = await props.params
   const id = params.id
    return <h1> Edit {id}</h1>
}