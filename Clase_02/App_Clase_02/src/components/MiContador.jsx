import { useState } from "react"
import MiInput from "./MiInput";

const MiContador = () => {
    //1. Definir el estado y su funcion de actualización
    const [contador, setContador] = useState(0);

    //2. Función que maneja el evento clic
    /* const handleClick = () => {
        // Actualizamos el estado del componente
        setContador(contador + 1);
    } */
    const aumentar = () => setContador(prev => prev + 1);
    const disminuir = () => setContador(prev => (prev > 0 ? prev - 1 : 0));
    const resetear = () => setContador(0);

    // Determinar color según el valor
    const colorTexto =
        contador === 0
            ? "text-gray-500"
            : contador > 10
                ? "text-red-500"
                : "text-blue-500";

    //3. JSX que va a consumir el estado

    return (
        <>
            <div className="p-6 bg-white rounded-lg shadow-md text-center">
                <div className="mb-4">
                    <span className="text-6xl">{contador === 0 ? `🙈` : contador > 10 ? `🙊` : `🙉`}</span>
                </div>
                <p className="text-xl">El contador vale: <span className={`font-bold ${colorTexto}`}>{contador}</span></p>
                <div className="flex w-full justify-center gap-3">
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        onClick={aumentar}
                    >
                        Aumentar
                    </button>
                    <button
                        className={`mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed`}
                        onClick={disminuir}
                        disabled={contador === 0}
                    >
                        Disminuir
                    </button>
                    <button
                        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        onClick={resetear}
                    >
                        Resetear
                    </button>
                </div>
                <MiInput borderColor={"bg-gray-100"} /> {/* Cada uno tendra su propio estado */}
                <MiInput borderColor={"bg-green-100"} />
                <MiInput borderColor={"bg-purple-100"} />
                {/* <input type="text" value={inputText} onChange={handleInputOnChange} /> */}
            </div>
        </>
    )
}

export default MiContador;