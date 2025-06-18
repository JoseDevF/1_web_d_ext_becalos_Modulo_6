import { useEffect } from "react";

// src/components/Card.jsx
export function Card({ children, contadorApp }) {

    useEffect(() => {
        console.log("useEffect contadorApp: ", contadorApp)
    }, [contadorApp])

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg">
            {contadorApp && <h2 className="text-xl font-bold">Contador: {contadorApp}</h2>}
            {children}
        </div>
    );
}

