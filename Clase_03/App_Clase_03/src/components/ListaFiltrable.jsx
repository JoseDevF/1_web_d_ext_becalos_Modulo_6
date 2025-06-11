import { useEffect, useState, useMemo } from "react";

export function ListaFiltrable() {
    const [items, setItems] = useState([]);
    const [filtro, setFiltro] = useState("");

    // Simular petición al montar el componente
    useEffect(() => {
        setTimeout(() => {
            setItems(["Manzana", "Banana", "Cereza", "Mora"]);
        }, 2000)
    }, [])

    //Guardar filtrado
    const itemsFiltrados = useMemo(() => {
        return items.filter(item => item.toLowerCase().includes(filtro.toLowerCase()))
    }, [items, filtro])

    return (
        <>
            <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-lg rounded-xl">
                <input
                    className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Filtrar…"
                    value={filtro}
                    onChange={e => setFiltro(e.target.value)}
                />
                {items.length === 0 ? (
                    <p className="text-center">Cargando…</p>
                ) : (
                    <ul className="list-disc list-inside space-y-1">
                        {itemsFiltrados.map((item, idx) => (
                            <li key={idx} className="px-2 py-1 hover:bg-gray-100 rounded">
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )

}