import { useState, useEffect } from "react";

export function Timer({ initValue = 60 }) {
    const [tiempo, setTiempo] = useState(initValue);

    useEffect(() => {
        console.log("Temporizador montado");
        const id = setInterval(() => {
            setTiempo(s => s - 1);
        }, 1000)

        return () => {
            clearInterval(id);
            console.log("Temporizador desmontado");
        }
    }, [])

    return (
        <>
            <div className="p-4 bg-white rounded-lg shadow text-center">
                <p className="text-xl">Segundos: {tiempo}</p>
            </div>
        </>
    )
}