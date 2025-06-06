import { useState } from "react";
import MiContador from "./MiContador";

/* La función recibe unas props (un objeto) */
const Perfil = ({ nombre, rol }) => {
    const [isSeguir, setIsSeguir] = useState(false);

    function handleOnClick() {
        setIsSeguir(!isSeguir);
    }

    /*
    1. Si el dato llega desde el componente padre, no va a cambiar ahi. Usa props.
    2. Si el dato cambia dentro del mismo componente (un contador, si es un modal que esta abierto o cerrado), usa state (useState). 
    */

    return (
        <>
            <div className="max-w-sm mx-auto mt-12 p-6 bg-white shadow-lg rounded-xl text-center">
                <div className="mb-4">
                    <span className="text-6xl">👨‍💼</span>
                </div>
                <h2 className="text-2xl font-bold">{nombre}</h2>
                <p className="text-gray-600">{rol}</p>
                <button
                    className={`mt-6 px-4 py-2 text-white rounded-lg hover:opacity-90 ${isSeguir ? "bg-red-500" : "bg-green-500"
                        }`}
                    onClick={handleOnClick}
                >
                    {isSeguir ? "Dejar de seguir" : "Seguir"}
                </button>
            </div>
            <MiContador />
        </>
    )
}

export default Perfil;