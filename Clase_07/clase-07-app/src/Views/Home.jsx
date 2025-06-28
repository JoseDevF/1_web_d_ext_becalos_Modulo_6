import { AutoFocus } from "../components/AutoFocus"
import { useEffect } from "react"

export default function Home() {
    useEffect(() => {
        console.log("Montaje de Home")
        return (() => console.log("Desmontaje de Home")
        )
    }, [])
    return (
        <>
            <h2 className="text-3xl font-bold">Bienvenido a React</h2>
            <AutoFocus />
        </>
    )
}