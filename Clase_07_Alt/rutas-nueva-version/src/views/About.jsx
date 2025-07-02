import { useEffect } from "react"
import { ProductCard } from "../components/ProductCard"

export default function About() {
    useEffect(() => {
        console.log("Montaje de About")
        return (() => console.log("Desmontaje de About")
        )
    }, [])
    return (
        <>
            <h2 className="text-3xl font-bold">About</h2>
            <ProductCard />
        </>
    )
}