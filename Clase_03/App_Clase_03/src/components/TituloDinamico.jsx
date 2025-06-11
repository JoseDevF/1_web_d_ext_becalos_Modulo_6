import { useEffect, useState } from "react";

export function TituloDinamico() {
    const [count, setCount] = useState(0);


    const effectHandler = () => {
        document.title = `Clicks: ${count}`;
    }

    //TODO: usar useEffect para actualizar document.title
    useEffect(effectHandler, [count])

    return (
        <>
            <div className="p-6 bg-white rounded-lg shadow-md text-center">
                <p className="text-xl">Clicks: {count}</p>
                <button
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    onClick={() => setCount(c => c + 1)}
                >
                    Click me
                </button>
            </div>
        </>
    )
}