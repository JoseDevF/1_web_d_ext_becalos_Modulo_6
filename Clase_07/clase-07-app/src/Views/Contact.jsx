import { useEffect } from "react"

export default function Contact() {
    useEffect(() => {
        console.log("Montaje de Contact")
        return (() => console.log("Desmontaje de Contact"))
    }, [])
    return (
        <>
            <h2 className="text-3xl font-bold">Contacto</h2>
            <h2 className="text-xl font-bold">55 555 555</h2>

        </>
    )
}