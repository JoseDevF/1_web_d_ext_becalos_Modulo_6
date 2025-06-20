import { useEffect, useState, useRef } from "react";

export function RenderCounter(props) {
    const renderCount = useRef(0)
    const [estadoInterno, setEstadoInterno] = useState(0);

    useEffect(() => {
        console.log("Cada vez que se renderiza el componente")
    })

    const handleClick = () => {
        setEstadoInterno(prev => prev + 1)
        console.log("local variable: ", localVariable)
        localVariable = localVariable + 1;
        console.log("estado interno: ", estadoInterno)
        console.log("local variable: ", localVariable)
    }

    const handleClickRef = () => {
        renderCount.current += 1;
        console.log("Valor de la referencia: ", renderCount.current)
    }

    return (
        <div className="max-w-xs">
            <p>{props.estado}</p>
            <p className="text-gray-700 mb-2">Este componente se ha renderizado:</p>
            <span className="text-3xl font-bold text-red">
                {renderCount.current}
            </span>
            <p className="text-gray-700 mb-2">veces</p>
            <button onClick={handleClick}>Boton interno</button>
            <button onClick={handleClickRef}>Boton ref</button>
        </div>
    )
}